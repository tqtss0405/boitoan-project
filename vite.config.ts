import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, path.resolve('.'), '');
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // Correct alias to src
      },
    },
    define: {
      // Chỉ định nghĩa API_KEY, không định nghĩa đè toàn bộ process.env
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY),
    },
  }
})