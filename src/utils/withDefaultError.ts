/* eslint-disable @typescript-eslint/only-throw-error */
import { UnhandledError, UnifiedError, UnifiedErrorClass } from "../core/types";

const handleError = (
  error: UnhandledError & { message?: string },
  DefaultErrorClass: UnifiedErrorClass,
  message?: string
): never => {
  if (!(error instanceof DefaultErrorClass)) {
    throw new DefaultErrorClass(message || error.message || "Default error", {
      innerError: error,
    });
  }

  throw error;
};

type FunctionToWrap<TArgs extends Array<unknown>, TOutput> = (
  ...args: TArgs
) => Promise<TOutput> | TOutput;

export const withDefaultError = <TArgs extends Array<unknown>, TOutput>(
  func: FunctionToWrap<TArgs, TOutput>,
  DefaultErrorClass: UnifiedErrorClass,
  message?: string
) => {
  return async (...args: TArgs) => {
    try {
      const result = await func(...args);
      return [result, undefined];
    } catch (error) {
      handleError(error as UnhandledError, DefaultErrorClass, message);
      return [undefined, error as UnifiedError];
    }
  };
};
