module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@controllers": "./src/controllers",
          "@lib": "./src/lib",
          "@domain": "./src/domain",
          "@config": "./src/config",
          "@interfaces": "./src/interfaces",
          "@main": "./src/main",
          "@tests": "./src/tests",
          "@utils": "./src/utils",
          "@presentations": "./src/presentations",
          "@infra": "./src/infra",
          "@presentation": "./src/presentation",
          "@validation": "./src/validation",
        },
      },
    ],
  ],
  ignore: ["**/*.spec.ts", "**/*.test.ts"],
};
