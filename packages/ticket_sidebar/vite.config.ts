import { defineConfig } from "vite";
import * as pluginPkg from "@app/zendesk/vite-plugin-inject-zaf-html/index.js";

const { injectZafHtmlPlugin } = pluginPkg.default;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [injectZafHtmlPlugin()],
  base: "./",
  build: {
    outDir: `${process.env.INIT_CWD}/dist/assets/${process.env.ADDON_TYPE}`,
    emptyOutDir: true,
  },
  server: {
   port: 3000,
 },
});
