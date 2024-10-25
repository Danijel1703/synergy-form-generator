import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), dts()],
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/index.ts"),
			name: "synergy-form-generator",
			formats: ["es", "cjs"],
			fileName: (format) => `index.${format}.js`,
		},
		rollupOptions: {
			external: ["react-select", "react", "react-dom"],
		},
		sourcemap: true,
	},
	resolve: {
		alias: {
			"synergy-form-generator": path.resolve(__dirname, "src/"),
			"synergy-form-generator/constants": path.resolve(
				__dirname,
				"src/constants/"
			),
			stores: path.resolve(__dirname, "src/stores/"),
			types: path.resolve(__dirname, "src/types/"),
			styles: path.resolve(__dirname, "src/styles/"),
			validators: path.resolve(__dirname, "src/utils/validators"),
			classes: path.resolve(__dirname, "src/classes/"),
		},
	},
});
