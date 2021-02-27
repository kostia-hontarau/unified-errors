const createErrorClasses = require("./create-error-classes");

const pathToErrorsDeclarations = process.cwd().concat("/.errors.js");
// eslint-disable-next-line import/no-dynamic-require
const errorDeclarations = require(pathToErrorsDeclarations);

module.exports = {
  errors: createErrorClasses(errorDeclarations),
  errorDeclarations,
};
