import { blankWocData } from '@/features/woc/defaults';
import type { WocData } from '@/features/woc/types';

export type WocWorkflowStep = 'capture' | 'confirm' | 'issue' | 'generate' | 'review';

export type GeneratedOutputs = {
  report: string;
  emailDraft: string;
};

export type WocState = {
  data: WocData;
  currentStep: WocWorkflowStep;
  confirmations: Record<string, boolean>;
  generatedOutputs: GeneratedOutputs | null;
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
  generatedOutputs: null,
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

export function setGeneratedOutputs(outputs: GeneratedOutputs) {
  inMemoryWocState.generatedOutputs = outputs;
}

export function getGeneratedOutputs() {
  return inMemoryWocState.generatedOutputs;
}
