import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// const path = require('path')

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // console.log(mode);
  Object.assign(process.env, loadEnv(mode, process.cwd()));
  return {
    plugins: [react()],
    server: {
      host: true,
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`,
        },
      },
    },
  };
});
