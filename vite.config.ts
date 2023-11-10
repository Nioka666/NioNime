import { defineConfig } from "vite";
import ViteTsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

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
      "/@img/": "./public/img/",
      "/@utils/": "./src/utils/",
    },
  },
});
