'use client';

import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';

type VisionExtraction = {
  workOrderNumber: string;
  partNumber: string;
  operationStep: string;
  issueDescription: string;
  rawText: string;
  confidenceNotes: string;
};


export default function CapturePage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [extraction, setExtraction] = useState<VisionExtraction | null>(null);

  const hasExtractedValues = useMemo(() => {
    if (!extraction) return false;

    return Object.values(extraction).some((value) => value.trim().length > 0);
  }, [extraction]);

  function handleImageSelect(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setSelectedImage(file);
    setErrorMessage('');
    setExtraction(null);
  }

  async function handleExtract(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedImage) {
      setErrorMessage('Please select an image before extracting.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setExtraction(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch('/api/extract-vision', {
        method: 'POST',
        body: formData,
      });

      const data = (await response.json()) as Partial<VisionExtraction> & { error?: string; details?: string };

      if (!response.ok) {
        const errorDetails = data.details ? ` ${data.details}` : '';
        throw new Error((data.error ?? 'Extraction failed.') + errorDetails);
      }

      setExtraction({
        workOrderNumber: data.workOrderNumber ?? '',
        partNumber: data.partNumber ?? '',
        operationStep: data.operationStep ?? '',
        issueDescription: data.issueDescription ?? '',
        rawText: data.rawText ?? '',
        confidenceNotes: data.confidenceNotes ?? '',
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to extract details from the image.');
      setExtraction(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AppShell title="Capture" description="Upload or capture a work order image, then extract AI-WOC details for operator review.">
      <form className="capture-card" onSubmit={handleExtract}>
        <label className="capture-label" htmlFor="work-order-image">
          Work order image
        </label>
        <input
          id="work-order-image"
          className="capture-input"
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          aria-describedby="capture-help-text"
        />
        <p id="capture-help-text" className="capture-help-text">
          Select a clear image of the work order to extract number, part, operation, issue, and confidence details.
        </p>

        <button className="capture-button" type="submit" disabled={isLoading || !selectedImage}>
          {isLoading ? 'Extracting...' : 'Extract With AI Vision'}
        </button>

        {errorMessage ? <p className="capture-error">{errorMessage}</p> : null}

        {extraction ? (
          <section className="capture-results" aria-live="polite">
            <h2>Extracted Preview</h2>
            <pre>{JSON.stringify(extraction, null, 2)}</pre>
            {!hasExtractedValues ? <p className="capture-help-text">No readable fields were detected in the image.</p> : null}
          </section>
        ) : null}
      </form>
    </AppShell>
  );
}
