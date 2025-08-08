export { generateErrors } from './generator/typescript-generator';

export { getErrorDeclarationByName } from './core/error-declaration-helpers';

export { withDefaultError } from './utils/withDefaultError';
export { DefaultHttpResponseConverter } from './utils/formatters/default-http-converter';

export type { 
  ErrorsContext, 
  UnhandledError, 
  ErrorFilter, 
  UnifiedError,
  ErrorDeclaration,
  ErrorsDeclaration,
  ErrorConverter,
  IErrorConverterConfig
} from './core/types';
