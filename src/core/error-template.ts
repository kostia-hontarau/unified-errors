// This file is now used by the build-time generator
// It provides templates for generating TypeScript error classes

import { IErrorConverterConfig } from "./types";

export const generateErrorClass = ({
  className,
  parentClassName,
  errorCode,
  converters,
}: {
  className: string;
  parentClassName: string;
  errorCode: string;
  converters?: IErrorConverterConfig[];
}): string => {
  const convertersCode = converters 
    ? `\n  static converters = ${JSON.stringify(converters, null, 2)};`
    : '';

  return `export class ${className} extends ${parentClassName} {
  constructor(message: string, meta?: Record<string, unknown>) {
    super('${errorCode}', message, meta);
  }${convertersCode}
}`;
};

export const generateErrorsExport = (errorNames: string[]): string => {
  return `export const errors = {
${errorNames.map(name => `  ${name},`).join('\n')}
};`;
};
