// @ts-ignore
import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
    checker({ typescript: true }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "sdk",
      formats: ["es", "umd"],
      fileName: (format) => `sdk.${format}.js`,
    },
  },
});
