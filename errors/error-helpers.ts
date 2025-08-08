
// Auto-generated helpers - DO NOT EDIT

import { UnifiedErrorClass } from './error-types';
import { errors } from './errors';

export function getErrorByName(name: string) {
  return (errors as Record<string, UnifiedErrorClass>)[name];
}

export function getAllErrorNames(): string[] {
  return Object.keys(errors);
}
