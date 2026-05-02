import test from 'node:test';
import assert from 'node:assert/strict';
import { extractResponsesOutputText, summarizeResponsesOutput } from './parser.js';

test('parses output_text response', () => {
  const json = '{"workOrderNumber":"WO-1","partNumber":"P-1","operationStep":"20","issueDescription":"Desc","rawText":"Raw","confidenceNotes":"High"}';
  assert.equal(extractResponsesOutputText({ output_text: json }), json);
});

test('parses output[].content[].text response', () => {
  const json = '{"workOrderNumber":"WO-2","partNumber":"P-2","operationStep":"30","issueDescription":"Issue","rawText":"Raw 2","confidenceNotes":"Medium"}';
  assert.equal(
    extractResponsesOutputText({ output: [{ content: [{ text: '  ' }] }, { content: [{ text: json }] }] }),
    json,
  );
});

test('empty response returns safe 502 details payload', () => {
  assert.equal(extractResponsesOutputText({ output: [{ content: [] }] }), undefined);
  assert.deepEqual(summarizeResponsesOutput({ output: [{ content: [] }] }), {
    hasOutputText: false,
    outputItemCount: 1,
    contentItemCount: 0,
  });
});
