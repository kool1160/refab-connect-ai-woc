import type { WocData } from './types';

export const blankWocData: WocData = {
  workOrder: '',
  partNumber: '',
  revision: '',
  customer: '',
  quantity: '',
  department: '',
  operation: '',
  process: '',
  currentListedRate: '',
  observedBaseline: '',
  issueType: 'Incorrect Time / Rate',
  correctionType: 'Incorrect Time / Rate',
  category: '',
  priority: 'Medium',
  problemSummary: '',
  requestedAction: '',
  optionalNote: '',
};

export const confirmationLabels = [
  'I confirm the work order number is correct.',
  'I confirm the part number is correct.',
  'I confirm the operation/process is correct.',
  'I confirm the issue and requested correction are accurate.',
  'I confirm the email draft is ready to send.',
];
