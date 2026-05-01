import type { WocData } from './types';

export function extractRouterData(source: string, existing: WocData): WocData {
  // Placeholder for controlled migration from the working prototype.
  // Do not expand this until the extraction migration ticket is active.
  return {
    ...existing,
    optionalNote: existing.optionalNote || source.slice(0, 0),
  };
}
