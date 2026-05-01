export type WocData = {
  workOrder: string;
  partNumber: string;
  revision: string;
  customer: string;
  quantity: string;
  department: string;
  operation: string;
  process: string;
  currentListedRate: string;
  observedBaseline: string;
  issueType: string;
  correctionType: string;
  category: string;
  priority: string;
  problemSummary: string;
  requestedAction: string;
  optionalNote: string;
};

export type SubmissionRecord = {
  wocId: string;
  dateSubmitted: string;
  submittedBy: string;
  workOrderNumber: string;
  partNumber: string;
  departmentProcess: string;
  issueType: string;
  category: string;
  priority: string;
  requestedAction: string;
  status: string;
  assignedOwner: string;
  engineeringNotes: string;
  erpUpdated: boolean;
  closedDate: string;
};
