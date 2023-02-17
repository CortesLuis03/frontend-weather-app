import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  console.log(mode)
  Object.assign(process.env, loadEnv(mode, process.cwd()));
  return {
    plugins: [react()],
    server: {
      host: true,
    },
  };
});
