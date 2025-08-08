import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { compileTemplateWithData } from "./template-engine";
import { ErrorsDeclaration } from "../core/types";

interface GeneratorOptions {
  configPath: string;
  outputDir: string;
  template: string;
}

export function generateErrors(options: GeneratorOptions) {
  const { configPath, outputDir } = options;

  const declarations = loadDeclarations(configPath);

  mkdirSync(outputDir, { recursive: true });

  generateErrorClasses(declarations, outputDir);
  generateTypes(declarations, outputDir);
  generateIndex(declarations, outputDir);
  generateHelpers(declarations, outputDir);
}

function loadDeclarations(configPath: string): ErrorsDeclaration {
  const fullPath = join(process.cwd(), configPath);

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require(fullPath) as ErrorsDeclaration;
}

function generateErrorClasses(
  declarations: ErrorsDeclaration,
  outputDir: string
) {
  const content = compileTemplateWithData("error-classes", {
    declarations,
    generatedAt: new Date().toISOString(),
  });

  writeFileSync(join(outputDir, "errors.ts"), content);
}

function generateTypes(
  declarations: ErrorsDeclaration,
  outputDir: string
) {
  const content = compileTemplateWithData("error-types", {
    declarations,
  });

  writeFileSync(join(outputDir, "error-types.ts"), content);
}

function generateIndex(
  declarations: ErrorsDeclaration,
  outputDir: string
) {
  const content = compileTemplateWithData("index", { declarations });

  writeFileSync(join(outputDir, "index.ts"), content);
}

function generateHelpers(
  declarations: ErrorsDeclaration,
  outputDir: string
) {
  const content = compileTemplateWithData("error-helpers", {
    declarations,
  });

  writeFileSync(join(outputDir, "error-helpers.ts"), content);
}
