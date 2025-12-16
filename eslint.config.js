import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      // tseslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      react.configs.recommended,
      reactDom.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser,
        // https://typescript-eslint.io/blog/project-service#configuration
        // project: ['./tsconfig.node.json', './tsconfig.app.json'],
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Put rules you want to override here
      // https://www.eslint-react.xyz/docs/rules/overview#x-rules
      "react-x/no-class-component": "warn",
      // https://www.eslint-react.xyz/docs/rules/overview#dom-rules
      "react-dom/no-dangerously-set-innerhtml": "warn",
    },
  },
]);
