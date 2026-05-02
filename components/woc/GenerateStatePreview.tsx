'use client';

import { generateEmailDraft } from '@/features/woc/emailDraftGenerator';
import { generateEngineeringReport } from '@/features/woc/reportGenerator';
import { getWocData } from '@/features/woc/state/wocState';

export function GenerateStatePreview() {
  const data = getWocData();
  const dateLabel = new Date().toLocaleDateString();

  const report = generateEngineeringReport(
    {
      ...data,
      requestedAction: data.requestedAction || '[ACTION PENDING ENGINEERING REVIEW]',
    },
    dateLabel,
  );

  const emailDraft = generateEmailDraft({
    ...data,
    requestedAction: data.requestedAction || '[ACTION PENDING ENGINEERING REVIEW]',
  });

  return (
    <section className="capture-card" aria-label="Generated report and email draft preview">
      <strong>Engineering Correction Report</strong>
      <p className="capture-help-text">Generated from confirmed Work Order Number, Part Number, and Issue Description.</p>
      <pre className="capture-help-text" style={{ whiteSpace: 'pre-wrap', marginTop: '0.75rem' }}>
        {report}
      </pre>

      <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid var(--line)' }} />

      <strong>Engineering Email Draft</strong>
      <p className="capture-help-text">Draft-first output for operator review before send.</p>
      <pre className="capture-help-text" style={{ whiteSpace: 'pre-wrap', marginTop: '0.75rem' }}>
        {emailDraft}
      </pre>
    </section>
  );
}
