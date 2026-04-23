import { defineConfig } from "cypress";
import viteConfig from "./frontend/vite.config";

const cypressViteConfig = {
  ...viteConfig,
  server: {
    ...(viteConfig.server ?? {}),
    port: 5587,
    strictPort: false,
  },
};

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: cypressViteConfig,
    },
  },
});
