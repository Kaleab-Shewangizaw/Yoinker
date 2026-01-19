import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    outDir: "dist",
    minify: false,
    sourcemap: true,

    rollupOptions: {
      input: {
        // Explicitly define ALL entries
        background: path.resolve(__dirname, "src/background.js"),
        content: path.resolve(__dirname, "src/content.js"),
        popup: path.resolve(__dirname, "index.html"), // ← This ensures index.html is built & copied to dist root
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },

  publicDir: "public",
});
