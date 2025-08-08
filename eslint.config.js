const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const prettier = require("eslint-config-prettier");

module.exports = tseslint.config(
  // Ignore JavaScript files and specific folders
  {
    ignores: ["**/*.js", "bin/**", "build/**", "node_modules/**", "dist/**"],
  },
  // Configuration for TypeScript files
  eslint.configs.recommended,
  prettier,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
  }
);
