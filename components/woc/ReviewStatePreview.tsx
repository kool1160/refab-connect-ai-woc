'use client';

import { generateEmailDraft, generateEmailSubject } from '@/features/woc/emailDraftGenerator';
import { generateEngineeringReport } from '@/features/woc/reportGenerator';
import { getGeneratedOutputs, getWocData } from '@/features/woc/state/wocState';

export function ReviewStatePreview() {
  const wocData = getWocData();
  const resolvedData = {
    ...wocData,
    requestedAction: wocData.requestedAction || '[ACTION PENDING ENGINEERING REVIEW]',
  };

  const cachedOutputs = getGeneratedOutputs();

  const outputs =
    cachedOutputs?.report && cachedOutputs?.emailDraft
      ? cachedOutputs
      : {
          report: generateEngineeringReport(resolvedData, new Date().toLocaleDateString()),
          emailDraft: generateEmailDraft(resolvedData),
        };

  const emailSubject = generateEmailSubject(resolvedData);

  async function handleCopy(text: string) {
    if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) return;
    await navigator.clipboard.writeText(text);
  }

  function handleSendViaEmail() {
    if (typeof window === 'undefined') return;

    const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(outputs.emailDraft)}`;
    window.location.href = mailtoLink;
  }

  return (
    <section className="capture-card" aria-label="Final review of generated report and email draft">
      <div className="review-actions" aria-label="Review copy and send actions">
        <button className="capture-button" type="button" onClick={() => void handleCopy(outputs.report)}>
          Copy Report
        </button>
        <button className="capture-button" type="button" onClick={() => void handleCopy(outputs.emailDraft)}>
          Copy Email Draft
        </button>
        <button className="capture-button capture-button-primary" type="button" onClick={handleSendViaEmail}>
          Send via Email
        </button>
      </div>

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
