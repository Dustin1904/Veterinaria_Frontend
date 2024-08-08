import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@layouts": path.resolve(__dirname, "./src/layout"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@context": path.resolve(__dirname, "./src/context"),
			"@routes": path.resolve(__dirname, "./src/routes"),
		},
	}
});
