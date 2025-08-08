
// Auto-generated types - DO NOT EDIT


export interface UnifiedError {
  message: string;
  errorCode: string;
  meta?: Record<string, unknown>;
};
export type UnifiedErrorClass = {
  new (message: string, meta?: Record<string, unknown>): UnifiedError;
};
