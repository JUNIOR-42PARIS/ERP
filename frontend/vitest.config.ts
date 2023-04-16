import { fileURLToPath } from "node:url";
import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      root: fileURLToPath(new URL("./test/", import.meta.url)),
    },
  })
);
