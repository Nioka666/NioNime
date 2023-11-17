import { defineConfig } from "vite";
import ViteTsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  server: {
    port: 80,
  },
  plugins: [react(), ViteTsconfigPaths()],
  build: {
    rollupOptions: {
      input: "./index.html",
    },
  },
  resolve: {
    alias: {
      "@img/*": path.resolve(__dirname, "./public/img"),
      // "/@utils/": "./src/utils/",
    },
  },
});
