const errorDeclarationHelpers = require("./error-declaration-helpers");
const UnifiedError = require("./unified-error");

module.exports = (error) => {
  if (error instanceof UnifiedError) {
    return {
      preprocessedError: error,
      errorDeclaration: errorDeclarationHelpers.getErrorDeclarationByName(
        error.name
      ),
      errorName: error.constructor.name,
    };
  }

  const {
    DefaultError,
    errorDeclaration,
    errorName,
  } = errorDeclarationHelpers.getDefaultError();

  return {
    preprocessedError: new DefaultError("Error occured!", {
      error,
    }),
    errorDeclaration,
    errorName,
  };
};
