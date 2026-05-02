'use client';

import { getWocData } from '@/features/woc/state/wocState';

export function GenerateStatePreview() {
  const data = getWocData();

  return (
    <section className="capture-card" aria-label="Persisted confirm values">
      <strong>Persisted Confirm Values</strong>
      <p className="capture-help-text">Placeholder preview of values carried from Confirm into Generate.</p>
      <p>
        <strong>Work Order Number:</strong> {data.workOrder || '[empty]'}
      </p>
      <p>
        <strong>Part Number:</strong> {data.partNumber || '[empty]'}
      </p>
      <p>
        <strong>Issue Description:</strong> {data.problemSummary || '[empty]'}
      </p>
    </section>
  );
}
