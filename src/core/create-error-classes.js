const saferEval = require("safer-eval");

const errorTemplate = require("./error-template");
const UnifiedError = require("./unified-error");

let errorContext = null;

const evaluateClass = (errorClassName, parentClassName, errorCode) => {
  const definedErrorClass = errorTemplate({
    className: errorClassName,
    parentClassName,
    errorCode,
  });
  const Class = saferEval(definedErrorClass, errorContext);
  errorContext[Class.name] = Class;
};

const createErrorClasses = (errorDeclarations, parentClassName) => {
  Object.keys(errorDeclarations).forEach((errorClassName) => {
    const errorDeclaration = errorDeclarations[errorClassName];
    evaluateClass(errorClassName, parentClassName, errorDeclaration.code);

    // Evaluate all related classes
    if (errorDeclaration.specificErrors) {
      createErrorClasses(errorDeclaration.specificErrors, errorClassName);
    }
  });
};

module.exports = (errorDeclarations) => {
  errorContext = {
    UnifiedError,
  };

  createErrorClasses(errorDeclarations, UnifiedError.name);

  return errorContext;
};
