import { DEFAULT_TO_EMAIL } from '@/lib/constants';
import type { WocData } from './types';

export function generateEmailSubject(data: WocData) {
  const category = (data.category || 'CATEGORY TBD').toUpperCase();
  return `[AI-WOC][${category}] WO ${data.workOrder || 'TBD'} | ${data.partNumber || 'PART TBD'} | ${data.correctionType}`;
}

export function generateEmailBody(data: WocData) {
  return `Engineering Team,\n\nPlease review the work order correction request below.\n\nWork Order:\n${data.workOrder || '[VERIFY WORK ORDER]'}\n\nPart Number:\n${data.partNumber || '[VERIFY PART NUMBER]'}\n\nRevision:\n${data.revision || '[N/A]'}\n\nCustomer:\n${data.customer || '[N/A]'}\n\nOperation:\n${data.operation || '[VERIFY OPERATION]'} – ${data.process || '[VERIFY PROCESS]'}\n\nIssue Summary:\n${data.problemSummary || '[PROBLEM SUMMARY REQUIRED]'}\n\nCurrent Listed Condition:\n${data.currentListedRate || '[CURRENT CONDITION REQUIRED]'}\n\nObserved Sustainable Baseline / Corrected Information:\n${data.observedBaseline || '[N/A]'}\n\nRequested Correction:\n${data.requestedAction || '[REQUESTED ENGINEERING ACTION REQUIRED]'}\n\nReason for Request:\nThe current work order information creates an inaccurate production expectation and may affect scheduling, labor planning, costing, or production flow if left unchanged.\n\nPriority:\n${data.priority}\n\nThank you,\n\nChris`;
}

export function generateEmailDraft(data: WocData) {
  const subject = generateEmailSubject(data);
  const body = generateEmailBody(data);

  return `To:\n${DEFAULT_TO_EMAIL}\n\nSubject:\n${subject}\n\nBody:\n${body}`;
}
