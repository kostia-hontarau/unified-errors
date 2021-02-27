const { errors } = require("./core");
const errorHandler = require("./core/error-handler");
const errorDeclarationHelpers = require("./core/error-declaration-helpers");

const instanceManager = require("./instance-manager");
const ErrorFormatter = require("./utils/error-formatter");

const koaMiddleware = require("./public/koa-middleware");

if (!errorDeclarationHelpers.getDefaultError()) {
  throw new Error("No default error is set in .errors.js!");
}

module.exports = {
  errors,

  ErrorFormatter,
  setFormatter: instanceManager.setFormatter.bind(instanceManager),

  handlers: {
    errorHandler,
    koaMiddleware,
  },
};
