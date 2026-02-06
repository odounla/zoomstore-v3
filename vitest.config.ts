import { defineConfig } from "vitest/config";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(root, "."),
    },
  },
  test: {
    environment: "node",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
  },
});
