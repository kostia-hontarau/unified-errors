const preprocessError = require("../core/preprocess-error.js");
const { errorFormatter } = require("../instance-manager");

module.exports = (error) => {
  const { preprocessedError, errorDeclaration } = preprocessError(error);

  return errorFormatter.getPublicError(preprocessedError, errorDeclaration);
};
