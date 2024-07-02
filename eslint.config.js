import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import qwik from "eslint-plugin-qwik";
import tseslint from "typescript-eslint";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    ignores: [
      "**/*.log",
      "**/.DS_Store",
      "*.",
      ".vscode/settings.json",
      ".history",
      ".yarn",
      "bazel-*",
      "bazel-bin",
      "bazel-out",
      "bazel-qwik",
      "bazel-testlogs",
      "dist",
      "dist-dev",
      "lib",
      "lib-types",
      "etc",
      "external",
      "node_modules",
      "temp",
      "tsc-out",
      "tsdoc-metadata.json",
      "target",
      "output",
      "rollup.config.js",
      "build",
      ".cache",
      ".vscode",
      ".rollup.cache",
      "dist",
      "tsconfig.tsbuildinfo",
      "vite.config.ts",
      "*.spec.tsx",
      "*.spec.ts",
      "*.css",
      ".netlify",
      "pnpm-lock.yaml",
      "package-lock.json",
      "yarn.lock",
      "server",
      "package.json",
    ],
    plugins: {
      qwik,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: tseslint.parser,
      globals: {
        browser: true,
        es2021: true,
        node: true,
      },
      parserOptions: {
        project: ["./tsconfig.json"],
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "no-inline-comments": "off",
      "unicorn/prevent-abbreviations": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      ...prettier.rules,
    },
  },
];
