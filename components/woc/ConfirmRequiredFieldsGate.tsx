'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getConfirmRequiredFieldErrors, hasConfirmRequiredFields } from '@/features/woc/validation';
import { getWocData, setWocCurrentStep, setWocDataField } from '@/features/woc/state/wocState';
import type { WocData } from '@/features/woc/types';

type ConfirmFieldKey = 'workOrder' | 'partNumber' | 'problemSummary';

const labels: Record<ConfirmFieldKey, string> = {
  workOrder: 'Work Order Number',
  partNumber: 'Part Number',
  problemSummary: 'Issue Description',
};

export function ConfirmRequiredFieldsGate() {
  const router = useRouter();
  const [data, setData] = useState<WocData>(() => ({ ...getWocData() }));
  const [touched, setTouched] = useState<Record<ConfirmFieldKey, boolean>>({
    workOrder: false,
    partNumber: false,
    problemSummary: false,
  });

  const errors = useMemo(() => getConfirmRequiredFieldErrors(data), [data]);
  const canContinue = useMemo(() => hasConfirmRequiredFields(data), [data]);

  function setField(field: ConfirmFieldKey, value: string) {
    setData((current) => ({ ...current, [field]: value }));
    setWocDataField(field, value);
  }

  function handleContinue() {
    if (!canContinue) return;
    setWocCurrentStep('generate');
    router.push('/generate');
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleContinue();
  }

  return (
    <form className="capture-card" onSubmit={handleSubmit} aria-label="Confirm required fields gate">
      <strong>Confirm Required Fields</strong>
      <p className="capture-help-text">Review and edit extracted values before continuing to Generate.</p>

      <label className="capture-label" htmlFor="confirm-work-order">
        {labels.workOrder}
      </label>
      <input
        id="confirm-work-order"
        className="confirm-input"
        value={data.workOrder}
        onChange={(event) => setField('workOrder', event.target.value)}
        onBlur={() => setTouched((current) => ({ ...current, workOrder: true }))}
      />
      {touched.workOrder && errors.workOrder ? <p className="confirm-inline-error">{errors.workOrder}</p> : null}

      <label className="capture-label" htmlFor="confirm-part-number">
        {labels.partNumber}
      </label>
      <input
        id="confirm-part-number"
        className="confirm-input"
        value={data.partNumber}
        onChange={(event) => setField('partNumber', event.target.value)}
        onBlur={() => setTouched((current) => ({ ...current, partNumber: true }))}
      />
      {touched.partNumber && errors.partNumber ? <p className="confirm-inline-error">{errors.partNumber}</p> : null}

      <label className="capture-label" htmlFor="confirm-issue-description">
        {labels.problemSummary}
      </label>
      <textarea
        id="confirm-issue-description"
        className="confirm-textarea"
        value={data.problemSummary}
        onChange={(event) => setField('problemSummary', event.target.value)}
        onBlur={() => setTouched((current) => ({ ...current, problemSummary: true }))}
        rows={4}
      />
      {touched.problemSummary && errors.problemSummary ? <p className="confirm-inline-error">{errors.problemSummary}</p> : null}

      <button className="capture-button" type="submit" disabled={!canContinue}>
        Continue to Generate
      </button>
    </form>
  );
}
