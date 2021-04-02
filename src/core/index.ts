import createErrorClasses from "./create-error-classes";

const pathToErrorsDeclarations = process.cwd().concat("/.errors.js");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const errorDeclarations = require(pathToErrorsDeclarations);

export default {
  errors: createErrorClasses(errorDeclarations),
  errorDeclarations,
};
