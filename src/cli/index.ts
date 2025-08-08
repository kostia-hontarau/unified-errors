#!/usr/bin/env node

import { Command } from "commander";
import { generateErrors } from "../core/typescript-generator";

const program = new Command();

program
  .name("unified-errors")
  .description("Generate TypeScript error classes from declarations")
  .version("1.0.0");

program
  .command("generate")
  .description("Generate error classes from .errors.js")
  .option(
    "-c, --config <path>",
    "Path to error declarations file",
    ".errors.js"
  )
  .option(
    "-o, --output <path>",
    "Output directory for generated files",
    "./errors"
  )
  .action((options: Record<string, string>) => {
    try {
      generateErrors({
        configPath: options.config,
        outputDir: options.output,
      });
      console.log("✅ Error classes generated successfully!");
    } catch (error) {
      console.error("❌ Error generating classes:", (error as Error).message);
      process.exit(1);
    }
  });

program.parse();
