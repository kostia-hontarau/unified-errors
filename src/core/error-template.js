const UnifiedError = require("./unified-error");

module.exports = ({ className, parentClassName, errorCode }) => {
  if (parentClassName !== UnifiedError.name) {
    return `(class ${className} extends ${parentClassName} {
      constructor(message, meta) {
        super(message, {
          ...meta,
          _errorCode: (meta && meta._errorCode) || '${errorCode}'
        });
      }
    })`;
  }

  return `(class ${className} extends ${parentClassName} {
    constructor(message, meta) {
      super((meta && meta._errorCode) || '${errorCode}', message, meta);
    }
  })`;
};
