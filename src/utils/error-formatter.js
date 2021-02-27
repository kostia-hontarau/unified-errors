/* eslint-disable no-unused-vars */

class ErrorFormatter {
  stringifyError(level, error, payload) {
    throw new Error(
      "stringifyError(level, error, payload) method is not implemented!"
    );
  }

  getPublicError(level, error, payload) {
    throw new Error(
      "getPublicError(level, error, payload) method is not implemented!"
    );
  }
}

module.exports = ErrorFormatter;
