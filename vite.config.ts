import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

function addPreloadToCSS(): Plugin {
  return {
    name: "add-preload-to-css",
    enforce: "post",
    apply: "build",
    generateBundle(_, bundle) {
      const htmlFileName = Object.keys(bundle).find((name) =>
        name.endsWith(".html")
      );

      if (htmlFileName) {
        const htmlFile = bundle[htmlFileName] as { source: string };
        let html = htmlFile.source;

        // Modify the HTML to add preload to CSS link
        html = html.replace(
          `rel="stylesheet"`,
          `rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'"`
        );

        htmlFile.source = html;
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), addPreloadToCSS()],
  css: {},
  base: "/fin-the-pen-web/",
  server: {
    proxy: {
      // 옵션과 함께: http://localhost:5173/api/bar-> http://jsonplaceholder.typicode.com/bar
      "/local": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/local/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            const module = id.split("node_modules/").pop().split("/")[0];
            return `vendor/${module}`;
          }
        },
      },
    },
    cssMinify: "esbuild",
    cssCodeSplit: false,
  },
});
