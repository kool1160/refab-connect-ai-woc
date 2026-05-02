export function extractResponsesOutputText(data) {
  return typeof data.output_text === "string" && data.output_text.trim().length > 0
    ? data.output_text
    : data.output
        ?.flatMap((outputItem) => outputItem.content ?? [])
        .find((contentItem) => typeof contentItem.text === "string" && contentItem.text.trim().length > 0)
        ?.text;
}

export function summarizeResponsesOutput(data) {
  const outputItemCount = Array.isArray(data.output) ? data.output.length : 0;
  const contentItemCount = Array.isArray(data.output)
    ? data.output.reduce((total, outputItem) => total + (Array.isArray(outputItem.content) ? outputItem.content.length : 0), 0)
    : 0;

  return {
    hasOutputText: typeof data.output_text === "string" && data.output_text.length > 0,
    outputItemCount,
    contentItemCount,
  };
}
