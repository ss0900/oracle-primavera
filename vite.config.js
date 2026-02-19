import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/oracle-primavera/",
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    watch: {
      awaitWriteFinish: {
        stabilityThreshold: 250,
        pollInterval: 100,
      },
    },
  },
});
