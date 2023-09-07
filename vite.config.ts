import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: "/fin-the-pen-web/",
  server: {
    proxy: {
      // 옵션과 함께: http://localhost:5173/api/bar-> http://jsonplaceholder.typicode.com/bar
      "/real": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/real/, ""),
      },
    },
  },
});
