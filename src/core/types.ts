import { BaseError } from "./base-error";

export type ErrorsContext = Record<string, UnifiedError>;
export type UnhandledError = Error | Record<string, unknown> | string;
export interface ErrorFilter {
  errorName?: string;
  isDefault?: boolean;
}

export type UnifiedError = {
  new (message: string, meta?: Record<string, unknown>): BaseError;
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
  convert(error: BaseError, declaration: ErrorDeclaration): T;
}
