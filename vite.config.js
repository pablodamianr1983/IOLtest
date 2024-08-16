import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/iol': {
        target: 'https://api.invertironline.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/iol/, ''),
      },
    },
  },
})
