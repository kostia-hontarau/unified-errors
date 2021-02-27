const ErrorFormatter = require("./error-formatter");
const DefaultErrorFormatter = require("./default/error-formatter");

class InstanceManager {
  constructor() {
    this._errorFormatter = new DefaultErrorFormatter();
  }

  get errorFormatter() {
    return this._errorFormatter;
  }

  setFormatter(value) {
    if (value instanceof ErrorFormatter) {
      this._errorFormatter = value;
    } else {
      throw new Error("Should be extended from ErrorFormatter");
    }
  }
}

module.exports = new InstanceManager();
