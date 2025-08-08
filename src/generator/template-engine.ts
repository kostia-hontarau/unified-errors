import Handlebars from "handlebars";
import {
  ErrorDeclaration,
  ErrorsDeclaration,
  IErrorConverterConfig,
} from "../core/types";

// Register Handlebars helpers
Handlebars.registerHelper("json", function (context) {
  return JSON.stringify(context, null, 2);
});

Handlebars.registerHelper("eq", function (a, b) {
  return a === b;
});

// Helper function to flatten error declarations recursively
function flattenErrorDeclarations(
  declarations: ErrorsDeclaration,
  parentName?: string
): Array<{
  name: string;
  parentName?: string;
  code: string;
  converters?: IErrorConverterConfig[];
}> {
  const flattened: Array<{
    name: string;
    parentName?: string;
    code: string;
    converters?: IErrorConverterConfig[];
  }> = [];

  function processDeclarations(decls: ErrorsDeclaration, parent?: string) {
    Object.entries(decls).forEach(
      ([name, declaration]: [string, ErrorDeclaration]) => {
        // Add current error
        flattened.push({
          name,
          parentName: parent || "BaseError",
          code: declaration.code,
          converters: declaration.converters,
        });

        // Recursively process children
        if (declaration.children) {
          processDeclarations(declaration.children, name);
        }
      }
    );
  }

  processDeclarations(declarations, parentName);
  return flattened;
}

// Helper function to generate error names for export recursively
function generateErrorNames(declarations: ErrorsDeclaration): string[] {
  const names: string[] = [];

  function collectNames(decls: ErrorsDeclaration) {
    Object.entries(decls).forEach(
      ([name, declaration]: [string, ErrorDeclaration]) => {
        names.push(name);

        if (declaration.children) {
          collectNames(declaration.children);
        }
      }
    );
  }

  collectNames(declarations);
  return names;
}

const templates = {
  "error-classes": `
// Auto-generated file - DO NOT EDIT
// Generated from .errors.js on {{generatedAt}}
import { UnifiedError } from "./error-types";

export class BaseError extends Error implements UnifiedError {
  errorCode: string;
  meta?: Record<string, unknown>;

  constructor(
    errorCode: string,
    message: string,
    meta?: Record<string, unknown>
  ) {
    super(message);

    this.errorCode = errorCode;
    this.name = this.constructor.name;

    delete meta?._errorCodeOverride;
    this.meta = meta;
  }
}

{{#each flattenedErrors}}
export class {{name}} extends {{parentName}} {
  constructor(message: string, meta?: Record<string, unknown>) {
    {{#if (eq parentName "BaseError")}}
    super('{{code}}', message, meta);
    {{else}}
    super(message, {
      ...meta,
      _errorCodeOverride: [meta?._errorCodeOverride, '{{code}}'].join('.')
    });
    {{/if}}
  }
  
  {{#if converters}}
  static converters = {{{json converters}}};
  {{/if}}
}

{{/each}}

// Main export object
export const errors = {
{{#each errorNames}}
  {{this}},
{{/each}}
};

// Export declarations for runtime use
export const errorDeclarations = {{{json declarations}}};
`,

  "error-types": `
// Auto-generated types - DO NOT EDIT


export interface UnifiedError {
  message: string;
  errorCode: string;
  meta?: Record<string, unknown>;
};
export type UnifiedErrorClass = {
  new (message: string, meta?: Record<string, unknown>): UnifiedError;
};
`,

  index: `
// Auto-generated index - DO NOT EDIT

export { errors, errorDeclarations } from './errors';
export * from './error-types';
export * from './error-helpers';
`,

  "error-helpers": `
// Auto-generated helpers - DO NOT EDIT

import { UnifiedErrorClass } from './error-types';
import { errors } from './errors';

export function getErrorByName(name: string) {
  return (errors as Record<string, UnifiedErrorClass>)[name];
}

export function getAllErrorNames(): string[] {
  return Object.keys(errors);
}
`,
};

export function compileTemplate(templateName: string) {
  const template = templates[templateName as keyof typeof templates];
  if (!template) {
    throw new Error(`Template ${templateName} not found`);
  }

  return Handlebars.compile(template);
}

export function compileTemplateWithData(
  templateName: string,
  data: { declarations: ErrorsDeclaration; generatedAt?: string }
) {
  const template = compileTemplate(templateName);

  if (templateName === "error-classes" || templateName === "error-types") {
    const flattenedErrors = flattenErrorDeclarations(data.declarations);
    const errorNames = generateErrorNames(data.declarations);

    return template({
      ...data,
      flattenedErrors,
      errorNames,
    });
  }

  return template(data);
}
