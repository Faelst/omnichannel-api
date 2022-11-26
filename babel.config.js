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
          "@modules": "./src/modules",
          "@config": "./src/config",
          "@interfaces": "./src/interfaces",
          "@main": "./src/main",
          "@tests": "./src/tests",
          "@utils": "./src/utils",
          "@presentations": "./src/presentations",
        },
      },
    ],
  ],
  ignore: ["**/*.spec.ts", "**/*.test.ts"],
};
