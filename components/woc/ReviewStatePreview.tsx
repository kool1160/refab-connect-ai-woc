'use client';

import { generateEmailDraft } from '@/features/woc/emailDraftGenerator';
import { generateEngineeringReport } from '@/features/woc/reportGenerator';
import { getGeneratedOutputs, getWocData } from '@/features/woc/state/wocState';

export function ReviewStatePreview() {
  const cachedOutputs = getGeneratedOutputs();

  const outputs =
    cachedOutputs?.report && cachedOutputs?.emailDraft
      ? cachedOutputs
      : {
          report: generateEngineeringReport(
            {
              ...getWocData(),
              requestedAction: getWocData().requestedAction || '[ACTION PENDING ENGINEERING REVIEW]',
            },
            new Date().toLocaleDateString(),
          ),
          emailDraft: generateEmailDraft({
            ...getWocData(),
            requestedAction: getWocData().requestedAction || '[ACTION PENDING ENGINEERING REVIEW]',
          }),
        };

  return (
    <section className="capture-card" aria-label="Final review of generated report and email draft">
      <strong>Engineering Correction Report</strong>
      <pre className="capture-help-text" style={{ whiteSpace: 'pre-wrap', marginTop: '0.75rem' }}>
        {outputs.report}
      </pre>

      <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid var(--line)' }} />

      <strong>Engineering Email Draft</strong>
      <pre className="capture-help-text" style={{ whiteSpace: 'pre-wrap', marginTop: '0.75rem' }}>
        {outputs.emailDraft}
      </pre>
    </section>
  );
}
