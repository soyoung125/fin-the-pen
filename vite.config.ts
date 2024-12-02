import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    css: {},
    base: "/",
    server: {
      proxy: {
        "/server-api": {
          target: env.VITE_LOCAL_DOMAIN,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/server-api/, ""),
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
    },
  });
};
