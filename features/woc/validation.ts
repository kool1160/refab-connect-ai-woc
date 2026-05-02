import type { WocData } from './types';

export function hasRequiredDraftFields(data: WocData) {
  const hasIdentifier = Boolean(data.partNumber.trim() || data.workOrder.trim());

  return Boolean(
    hasIdentifier &&
      data.category.trim() &&
      data.priority.trim() &&
      data.correctionType.trim() &&
      data.problemSummary.trim() &&
      data.requestedAction.trim(),
  );
}

export function getReadinessWarnings(data: WocData) {
  const warnings: string[] = [];
  const hasPartNumber = Boolean(data.partNumber.trim());
  const hasWorkOrder = Boolean(data.workOrder.trim());

  if (!hasPartNumber && !hasWorkOrder) warnings.push('Missing identifier: add Part Number or Work Order Number.');
  if (!hasPartNumber && hasWorkOrder) warnings.push('Part Number is preferred. A work order may contain multiple parts.');
  if (!hasWorkOrder && hasPartNumber) warnings.push('Work Order Number is recommended as a helpful backup identifier.');
  if (!data.operation.trim()) warnings.push('Operation / Router Step is preferred but not required for send.');
  if (!data.process.trim()) warnings.push('Process is preferred but not required for send.');
  if (!data.revision.trim()) warnings.push('Revision is preferred but not required for send.');
  if (!data.customer.trim()) warnings.push('Customer is preferred but not required for send.');
  if (!data.quantity.trim()) warnings.push('Quantity is preferred but not required for send.');

  return warnings;
}


export function getConfirmRequiredFieldErrors(data: WocData) {
  return {
    workOrder: data.workOrder.trim() ? '' : 'Work Order Number is required.',
    partNumber: data.partNumber.trim() ? '' : 'Part Number is required.',
    problemSummary: data.problemSummary.trim() ? '' : 'Issue Description is required.',
  };
}

export function hasConfirmRequiredFields(data: WocData) {
  const errors = getConfirmRequiredFieldErrors(data);
  return Boolean(!errors.workOrder && !errors.partNumber && !errors.problemSummary);
}
