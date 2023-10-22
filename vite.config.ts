import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
      models: path.resolve(__dirname, "src/models/"),
      pages: path.resolve(__dirname, "src/pages/"),
      router: path.resolve(__dirname, "src/router/"),
      routes: path.resolve(__dirname, "src/router/routes"),
      constants: path.resolve(__dirname, "src/constants/"),
      stores: path.resolve(__dirname, "src/stores/"),
      types: path.resolve(__dirname, "src/types/"),
      styles: path.resolve(__dirname, "src/styles/"),
      validators: path.resolve(__dirname, "src/utils/form/validators"),
      classes: path.resolve(__dirname, "src/classes/"),
    },
  },
});
