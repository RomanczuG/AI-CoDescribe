import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    viteCompression({ algorithm: "gzip", deleteOriginFile: false }),
    
  ],
  server: {
    // port: 8000,
  },
  build: {
    sourcemap: true,
    emptyOutDir: true,
  },
});
