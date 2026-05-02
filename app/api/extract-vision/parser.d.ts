export type ResponsesApiPayload = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
};

export function extractResponsesOutputText(data: ResponsesApiPayload): string | undefined;
export function summarizeResponsesOutput(data: ResponsesApiPayload): {
  hasOutputText: boolean;
  outputItemCount: number;
  contentItemCount: number;
};
