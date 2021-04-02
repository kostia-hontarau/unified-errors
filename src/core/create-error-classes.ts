import saferEval from "safer-eval";

import errorTemplate from "./error-template";
import { ErrorsDeclaration, ErrorsContext, UnifiedError } from "./types";
import { BaseError } from "./base-error";

let globalErrorsContext: ErrorsContext | null = null;

const evaluateClass = (
  errorClassName: string,
  parentClassName: string,
  errorCode: string,
  errorsContext: ErrorsContext
) => {
  const definedErrorClass = errorTemplate({
    className: errorClassName,
    parentClassName,
    errorCode,
  });
  const Class = saferEval(definedErrorClass, errorsContext) as UnifiedError;
  errorsContext[Class.name] = Class;
};

const createErrorClasses = (
  errorsDeclarations: ErrorsDeclaration,
  parentClassName: string,
  errorsContext: ErrorsContext
) => {
  Object.keys(errorsDeclarations).forEach((errorClassName) => {
    const errorDeclaration = errorsDeclarations[errorClassName];
    evaluateClass(
      errorClassName,
      parentClassName,
      errorDeclaration.code,
      errorsContext
    );

    // Evaluate all related classes
    if (errorDeclaration.children) {
      createErrorClasses(
        errorDeclaration.children,
        errorClassName,
        errorsContext
      );
    }
  });
};

export default (errorsDeclarations: ErrorsDeclaration): ErrorsContext => {
  if (globalErrorsContext) {
    return globalErrorsContext;
  }

  globalErrorsContext = {
    BaseError: (BaseError as unknown) as UnifiedError,
  };

  createErrorClasses(errorsDeclarations, BaseError.name, globalErrorsContext);

  return globalErrorsContext;
};

export const clear = (): void => {
  globalErrorsContext = null;
};
