import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: 80,
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      input: "./index.html",
    },
  },
});
