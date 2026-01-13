import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./", "./client"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**"],
    },
    proxy: {
      "/api": {
        target: "http://localhost:3334",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/product_img": "http://localhost:3334",
      "/category_img": "http://localhost:3334",
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
    },
  },
}));
