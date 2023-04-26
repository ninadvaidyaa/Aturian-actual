module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "standard-with-typescript",
    "prettier",
    "plugin:storybook/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["react"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      {
        allowNullish: true,
        allowBoolean: true,
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: ["@mui/*/*/*"],
      },
    ],
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-misused-promises": [
      2,
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    semi: [2, "always"],
    "arrow-body-style": [
      "error",
      "as-needed",
      { requireReturnForObjectLiteral: false },
    ],
  },
};
