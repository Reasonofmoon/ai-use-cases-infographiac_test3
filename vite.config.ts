import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // PostCSS 설정을 제거하고 별도의 postcss.config.js 파일로 이동
});
