import { blankWocData } from '@/features/woc/defaults';
import type { WocData } from '@/features/woc/types';

export type WocWorkflowStep = 'capture' | 'confirm' | 'issue' | 'generate' | 'review';

export type WocState = {
  data: WocData;
  currentStep: WocWorkflowStep;
  confirmations: Record<string, boolean>;
};

export const inMemoryWocState: WocState = {
  data: { ...blankWocData },
  currentStep: 'capture',
  confirmations: {
    workOrderConfirmed: false,
    partConfirmed: false,
    processConfirmed: false,
    issueConfirmed: false,
    emailReadyConfirmed: false,
  },
};

export function getWocData(): WocData {
  return inMemoryWocState.data;
}

export function setWocDataField(field: keyof WocData, value: string) {
  inMemoryWocState.data = {
    ...inMemoryWocState.data,
    [field]: value,
  };
}

export function setWocCurrentStep(step: WocWorkflowStep) {
  inMemoryWocState.currentStep = step;
}
