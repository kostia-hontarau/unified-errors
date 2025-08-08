
// Auto-generated types - DO NOT EDIT

export type UnhandledError = Error | Record<string, unknown> | string;

export interface UnifiedError {
  message: string;
  errorCode: string;
  meta?: Record<string, unknown>;
};
export type UnifiedErrorClass = {
  new (message: string, meta?: Record<string, unknown>): UnifiedError;
};
