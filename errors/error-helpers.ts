
// Auto-generated helpers - DO NOT EDIT

import { errors } from './errors';

export function getErrorByName(name: string) {
  return (errors as any)[name];
}

export function getAllErrorNames(): string[] {
  return Object.keys(errors);
}
