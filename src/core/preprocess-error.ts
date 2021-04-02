import * as errorDeclarationHelpers from "./error-declaration-helpers";
import { ErrorDeclaration, UnhandledError } from "./types";
import { BaseError } from "./base-error";

export default (
  error: UnhandledError
): { error: BaseError; errorDeclaration: ErrorDeclaration | null } => {
  if (error instanceof BaseError) {
    return {
      error,
      errorDeclaration: errorDeclarationHelpers.getErrorDeclarationByName(
        error.name
      ),
    };
  }

  const result = errorDeclarationHelpers.getDefaultError();
  if (!result) {
    throw new Error("Default error configuration was not found");
  }

  return {
    error: new result.DefaultError("Error occured!", {
      error,
    }),
    errorDeclaration: result.errorDeclaration,
  };
};
