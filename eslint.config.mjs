import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // House rule: no em dashes anywhere in the site's copy (they read as
  // machine-written). Rewrite with a period, comma, colon or parentheses.
  {
    files: ["src/**/*.{ts,tsx,js,jsx,mjs}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        ...[
          "Literal[value=/\u2014/]",
          "TemplateElement[value.raw=/\u2014|\\\\u2014/]",
          "JSXText[value=/\u2014|&mdash;|&#8212;|&#x2014;/i]",
          "JSXText[raw=/&mdash;|&#8212;|&#x2014;/i]",
          "Literal[raw=/\\\\u2014/i]",
        ].map((selector) => ({
          selector,
          message:
            "No em dashes in site copy. Rewrite with a period, comma, colon or parentheses.",
        })),
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
