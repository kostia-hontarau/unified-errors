const ErrorFormatter = require("../error-formatter");

/* eslint-disable no-unused-vars */
class DefaultErrorFormatter extends ErrorFormatter {
  stringifyError(level, error, payload) {
    const jsonError = JSON.stringify(error);
    const jsonPayload = JSON.stringify(payload);

    return `${level}: ${error.message}. JSON: ${jsonError}. Payload: ${jsonPayload}.`;
  }

  getPublicError(level, error, payload) {
    return {
      http: {
        status: 500,
        body: {
          message: error.message,
        },
      },
    };
  }
}

module.exports = DefaultErrorFormatter;
