import { BaseError } from "./base-error";

export default ({
  className,
  parentClassName,
  errorCode,
}: {
  className: string;
  parentClassName: string;
  errorCode: string;
}): string => {
  if (parentClassName !== BaseError.name) {
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
