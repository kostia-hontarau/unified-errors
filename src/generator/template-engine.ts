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

// Helper function to flatten error declarations
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

  Object.entries(declarations).forEach(
    ([name, declaration]: [string, ErrorDeclaration]) => {
      // Add parent error
      flattened.push({
        name,
        parentName: parentName || "BaseError",
        code: declaration.code,
        converters: declaration.converters,
      });

      // Add child errors
      if (declaration.children) {
        Object.entries(declaration.children).forEach(
          ([childName, childDeclaration]: [string, ErrorDeclaration]) => {
            flattened.push({
              name: childName,
              parentName: name,
              code: childDeclaration.code,
              converters: childDeclaration.converters,
            });
          }
        );
      }
    }
  );

  return flattened;
}

// Helper function to generate error names for export
function generateErrorNames(declarations: ErrorsDeclaration): string[] {
  const names: string[] = [];

  Object.entries(declarations).forEach(
    ([name, declaration]: [string, ErrorDeclaration]) => {
      names.push(name);

      if (declaration.children) {
        Object.keys(declaration.children).forEach((childName) => {
          names.push(childName);
        });
      }
    }
  );

  return names;
}

const templates = {
  "error-classes": `
// Auto-generated file - DO NOT EDIT
// Generated from .errors.js on {{generatedAt}}

import { BaseError } from '../core/base-error';

{{#each flattenedErrors}}
export class {{name}} extends {{parentName}} {
  constructor(message: string, meta?: Record<string, unknown>) {
    {{#if (eq parentName "BaseError")}}
    super('{{code}}', message, meta);
    {{else}}
    super(message, {
      ...meta,
      _errorCodeOverride: (meta && meta._errorCodeOverride) || '{{code}}'
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

import * as GeneratedErrors from './errors';

{{#each flattenedErrors}}
export type {{name}}Error = InstanceType<typeof GeneratedErrors.{{name}}>;
{{/each}}

export type GeneratedErrorsType = {
{{#each flattenedErrors}}
  {{name}}: typeof GeneratedErrors.{{name}};
{{/each}}
};

export type ErrorNames = keyof GeneratedErrorsType;
`,

  index: `
// Auto-generated index - DO NOT EDIT

export { errors, errorDeclarations } from './errors';
export * from './error-types';
export * from './error-helpers';
`,

  "error-helpers": `
// Auto-generated helpers - DO NOT EDIT

import { errors } from './errors';

export function getErrorByName(name: string) {
  return (errors as any)[name];
}

export function getDefaultError() {
  // Find error with isDefault: true
  // Implementation based on declarations
  return null;
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
