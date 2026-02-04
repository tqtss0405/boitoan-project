import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Map biến môi trường VITE_API_KEY thành process.env.API_KEY để code cũ hoạt động
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY),
      // Định nghĩa process.env rỗng để tránh lỗi crash runtime
      'process.env': {},
    },
  }
})