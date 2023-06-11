import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:4200",
    experimentalRunAllSpecs: true,
    // specPattern: "**/components/**/*.cy.js",
  },

  // component: {
  //   devServer: {
  //     framework: "angular",
  //     bundler: "webpack",
  //   },
  //   specPattern: "**/*.cy.ts",
  // },
});
