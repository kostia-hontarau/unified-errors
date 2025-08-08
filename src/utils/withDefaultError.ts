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

type FunctionToWrap<TArgs extends Array<any>, TOutput> = (
  ...args: TArgs
) => TOutput;

export const withDefaultError = <TArgs extends Array<any>, TOutput>(
  func: FunctionToWrap<TArgs, TOutput>,
  DefaultErrorClass: UnifiedError,
  message?: string
) => {
  return (...args: TArgs) => {
    try {
      const result = func(...args);
      if (!result || !(result instanceof Promise)) {
        return result;
      }

      return (result as Promise<TOutput>).catch((error: UnhandledError) =>
        handleError(error, DefaultErrorClass, message)
      );
    } catch (error) {
      handleError(error as UnhandledError, DefaultErrorClass, message);
    }
  };
};
