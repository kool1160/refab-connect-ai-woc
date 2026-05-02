import { NextResponse } from "next/server";

type VisionExtraction = {
  workOrderNumber: string;
  partNumber: string;
  operationStep: string;
  issueDescription: string;
  rawText: string;
  confidenceNotes: string;
};

function parseImageInput(value: string): { base64Image: string; mimeType: string } {
  const trimmed = value.trim();
  const dataUrlMatch = trimmed.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);

  if (dataUrlMatch) {
    return {
      mimeType: dataUrlMatch[1],
      base64Image: dataUrlMatch[2],
    };
  }

  return {
    mimeType: "image/jpeg",
    base64Image: trimmed,
  };
}

function parseJsonObject(text: string): VisionExtraction {
  const parsed = JSON.parse(text) as Partial<VisionExtraction>;

  return {
    workOrderNumber: typeof parsed.workOrderNumber === "string" ? parsed.workOrderNumber : "",
    partNumber: typeof parsed.partNumber === "string" ? parsed.partNumber : "",
    operationStep: typeof parsed.operationStep === "string" ? parsed.operationStep : "",
    issueDescription: typeof parsed.issueDescription === "string" ? parsed.issueDescription : "",
    rawText: typeof parsed.rawText === "string" ? parsed.rawText : "",
    confidenceNotes: typeof parsed.confidenceNotes === "string" ? parsed.confidenceNotes : "",
  };
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing server configuration: OPENAI_API_KEY is not set." }, { status: 500 });
  }

  let base64Image = "";
  let mimeType = "image/jpeg";

  try {
    const contentType = request.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();

      const file = formData.get("image");
      const imageBase64 = formData.get("imageBase64");

      if (file instanceof File && file.size > 0) {
        const bytes = await file.arrayBuffer();
        base64Image = Buffer.from(bytes).toString("base64");
        mimeType = file.type.startsWith("image/") ? file.type : "image/jpeg";
      } else if (typeof imageBase64 === "string") {
        const parsedImage = parseImageInput(imageBase64);
        base64Image = parsedImage.base64Image;
        mimeType = parsedImage.mimeType;
      }
    } else {
      const body = (await request.json()) as { imageBase64?: string; image?: string };
      const payloadImage = body.imageBase64 ?? body.image;

      if (typeof payloadImage === "string") {
        const parsedImage = parseImageInput(payloadImage);
        base64Image = parsedImage.base64Image;
        mimeType = parsedImage.mimeType;
      }
    }
  } catch {
    return NextResponse.json({ error: "Invalid request payload. Provide an uploaded image or imageBase64 payload." }, { status: 400 });
  }

  if (!base64Image) {
    return NextResponse.json({ error: "Missing image payload. Provide an uploaded image or imageBase64 value." }, { status: 400 });
  }

  const schema = {
    type: "object",
    additionalProperties: false,
    properties: {
      workOrderNumber: { type: "string" },
      partNumber: { type: "string" },
      operationStep: { type: "string" },
      issueDescription: { type: "string" },
      rawText: { type: "string" },
      confidenceNotes: { type: "string" },
    },
    required: ["workOrderNumber", "partNumber", "operationStep", "issueDescription", "rawText", "confidenceNotes"],
  };

  try {
    const openAIResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: "Extract AI-WOC fields from this work order image. If missing or unreadable, return empty strings.",
              },
              {
                type: "input_image",
                image_url: `data:${mimeType};base64,${base64Image}`,
              },
            ],
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "woc_vision_extraction",
            schema,
            strict: true,
          },
        },
      }),
    });

    if (!openAIResponse.ok) {
      const errorBody = await openAIResponse.text();
      return NextResponse.json(
        {
          error: "OpenAI request failed.",
          details: errorBody.slice(0, 500),
        },
        { status: 502 },
      );
    }

    const data = (await openAIResponse.json()) as {
      output_text?: string;
      output?: Array<{
        content?: Array<{
          type?: string;
          text?: string;
        }>;
      }>;
    };

    const outputText = typeof data.output_text === "string" && data.output_text.trim().length > 0
      ? data.output_text
      : data.output
          ?.flatMap((outputItem) => outputItem.content ?? [])
          .find((contentItem) => typeof contentItem.text === "string" && contentItem.text.trim().length > 0)
          ?.text;

    if (!outputText) {
      const outputItemCount = Array.isArray(data.output) ? data.output.length : 0;
      const contentItemCount = Array.isArray(data.output)
        ? data.output.reduce((total, outputItem) => total + (Array.isArray(outputItem.content) ? outputItem.content.length : 0), 0)
        : 0;

      return NextResponse.json(
        {
          error: "OpenAI response did not include structured output.",
          details: {
            hasOutputText: typeof data.output_text === "string" && data.output_text.length > 0,
            outputItemCount,
            contentItemCount,
          },
        },
        { status: 502 },
      );
    }

    const extraction = parseJsonObject(outputText);
    return NextResponse.json(extraction);
  } catch (error) {
    return NextResponse.json(
      {
        error: "OpenAI request failed.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 502 },
    );
  }
}
