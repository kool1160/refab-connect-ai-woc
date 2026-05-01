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
