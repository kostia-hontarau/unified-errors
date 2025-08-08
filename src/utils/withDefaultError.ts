import { UnhandledError, UnifiedError } from "../core/types";

const handleError = (
  error: UnhandledError,
  DefaultErrorClass: UnifiedError,
  message?: string
): never => {
  if (!(error instanceof DefaultErrorClass)) {
    throw new DefaultErrorClass(message || "Default error", {
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
  DefaultErrorClass: UnifiedError,
  message?: string
) => {
  return async (...args: TArgs) => {
    try {
      const result = await func(...args);
      return result;
    } catch (error) {
      handleError(error as UnhandledError, DefaultErrorClass, message);
    }
  };
};
