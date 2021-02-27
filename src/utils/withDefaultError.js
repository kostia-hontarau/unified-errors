/* eslint-disable consistent-return */
const UnifiedError = require("../core/unified-error");

const handleError = (error, DefaultErrorClass, message) => {
  if (!(error instanceof DefaultErrorClass)) {
    if (DefaultErrorClass === UnifiedError) {
      throw new UnifiedError(null, message || "default error", {
        innerError: error,
      });
    }

    throw new DefaultErrorClass(message || "default error", {
      innerError: error,
    });
  }

  throw error;
};

const withDefaultError = (method, DefaultErrorClass, message) => {
  return (...args) => {
    try {
      const result = method(...args);
      if (!result || (result && !result.then)) {
        return result;
      }

      return result.catch((error) =>
        handleError(error, DefaultErrorClass, message)
      );
    } catch (error) {
      handleError(error, DefaultErrorClass, message);
    }
  };
};

module.exports = {
  withDefaultError,
};
