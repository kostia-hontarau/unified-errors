import unifiedErrors from "./core";
import * as errorDeclarationHelpers from "./core/error-declaration-helpers";

if (!errorDeclarationHelpers.getDefaultError()) {
  throw new Error("No default error is set in .errors.js!");
}

module.exports = {
  errors: unifiedErrors.errors,
};
