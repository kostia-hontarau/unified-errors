export type ErrorsContext = Record<string, UnifiedErrorClass>;
export type UnhandledError = Error | Record<string, unknown> | string;
export interface ErrorFilter {
  errorName?: string;
  isDefault?: boolean;
}

export interface UnifiedError {
  message: string;
  errorCode: string;
  meta?: Record<string, unknown>;
};

export type UnifiedErrorClass = {
  new (message: string, meta?: Record<string, unknown>): UnifiedError;
};

export interface IErrorConverterConfig<T = Record<string, unknown>> {
  type: string;
  payload: T;
}
export interface ErrorDeclaration {
  code: string;
  children?: ErrorsDeclaration;
  isDefault?: boolean;
  converters?: IErrorConverterConfig[];
}
export interface ErrorsDeclaration {
  [errorName: string]: ErrorDeclaration;
}

export interface ErrorConverter<T = Record<string, unknown> | string> {
  convert(error: UnifiedError, declaration: ErrorDeclaration): T;
}
