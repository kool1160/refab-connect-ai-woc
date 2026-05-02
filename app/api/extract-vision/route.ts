import { NextResponse } from "next/server";

type VisionExtraction = {
  workOrderNumber: string;
  partNumber: string;
  operationStep: string;
  issueDescription: string;
  rawText: string;
  confidenceNotes: string;
};

const EMPTY_RESULT: VisionExtraction = {
  workOrderNumber: "",
  partNumber: "",
  operationStep: "",
  issueDescription: "",
  rawText: "",
  confidenceNotes: "",
};

function sanitizeBase64Input(value: string): string {
  const trimmed = value.trim();
  const dataUrlMatch = trimmed.match(/^data:(?:image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  return dataUrlMatch ? dataUrlMatch[1] : trimmed;
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

  try {
    const contentType = request.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();

      const file = formData.get("image");
      const imageBase64 = formData.get("imageBase64");

      if (file instanceof File && file.size > 0) {
        const bytes = await file.arrayBuffer();
        base64Image = Buffer.from(bytes).toString("base64");
      } else if (typeof imageBase64 === "string") {
        base64Image = sanitizeBase64Input(imageBase64);
      }
    } else {
      const body = (await request.json()) as { imageBase64?: string; image?: string };
      const payloadImage = body.imageBase64 ?? body.image;

      if (typeof payloadImage === "string") {
        base64Image = sanitizeBase64Input(payloadImage);
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
                image_url: `data:image/jpeg;base64,${base64Image}`,
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

    const data = (await openAIResponse.json()) as { output_text?: string };

    if (!data.output_text) {
      return NextResponse.json(
        { error: "OpenAI response did not include structured output." },
        { status: 502 },
      );
    }

    const extraction = parseJsonObject(data.output_text);
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
