import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    environment: "node",
    inspector: { enabled: false },
    exclude: ["./node_modules/**"],
    include: ["./src/**/*.test.ts"],
  },
});
