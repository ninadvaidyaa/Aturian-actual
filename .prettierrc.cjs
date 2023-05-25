module.exports = {
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  importOrder: [
    "^react",
    "^(?!(hooks|types|utils|shared|modules|[./])).+",
    "^hooks",
    "^types",
    "^utils",
    "^shared",
    "modules",
    "^[./]",
  ],
  importOrderSeparation: true,
  singleAttributePerLine: true,
  plugins: [require("prettier-plugin-tailwindcss")],
};
