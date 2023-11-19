import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      plugins: [],
    }),
  ],
  base: "/",
  resolve: {
    alias: {
      lodash: "lodash-es",
    },
  },
  build: {
    rollupOptions: {
      external: [/^node:.*/],
      output: {
        manualChunks(id: string) {
          // creating a chunk to react routes deps. Reducing the vendor chunk size
          if (
            id.includes("react-router-dom") ||
            id.includes("@remix-run") ||
            id.includes("react-router")
          ) {
            return "@router";
          }

          if (id.includes("@mui")) {
            return "@mui";
          }

          if (id.includes("react")) {
            return "@react";
          }
        },
      },
    },
  },
});
