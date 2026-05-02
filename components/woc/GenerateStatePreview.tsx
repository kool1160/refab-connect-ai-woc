'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { generateEmailDraft } from '@/features/woc/emailDraftGenerator';
import { generateEngineeringReport } from '@/features/woc/reportGenerator';
import { getWocData, setGeneratedOutputs, setWocCurrentStep } from '@/features/woc/state/wocState';

function getGeneratedOutputs() {
  const data = getWocData();
  const normalizedData = {
    ...data,
    requestedAction: data.requestedAction || '[ACTION PENDING ENGINEERING REVIEW]',
  };

  const dateLabel = new Date().toLocaleDateString();

  return {
    report: generateEngineeringReport(normalizedData, dateLabel),
    emailDraft: generateEmailDraft(normalizedData),
  };
}

export function GenerateStatePreview() {
  const router = useRouter();
  const outputs = useMemo(() => {
    const generated = getGeneratedOutputs();
    setGeneratedOutputs(generated);
    return generated;
  }, []);

  function handleContinueToReview() {
    setGeneratedOutputs(outputs);
    setWocCurrentStep('review');
    router.push('/review');
  }

  return (
    <section className="capture-card" aria-label="Generated report and email draft preview">
      <strong>Engineering Correction Report</strong>
      <p className="capture-help-text">Generated from confirmed Work Order Number, Part Number, and Issue Description.</p>
      <pre className="capture-help-text" style={{ whiteSpace: 'pre-wrap', marginTop: '0.75rem' }}>
        {outputs.report}
      </pre>

      <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid var(--line)' }} />

      <strong>Engineering Email Draft</strong>
      <p className="capture-help-text">Draft-first output for operator review before send.</p>
      <pre className="capture-help-text" style={{ whiteSpace: 'pre-wrap', marginTop: '0.75rem' }}>
        {outputs.emailDraft}
      </pre>

      <button className="capture-button" type="button" onClick={handleContinueToReview}>
        Continue to Review
      </button>
    </section>
  );
}
