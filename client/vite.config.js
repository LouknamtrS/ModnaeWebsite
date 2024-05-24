import { defineConfig } from 'vite'
import dns from 'dns'
import react from '@vitejs/plugin-react-swc'

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Use '0.0.0.0' to listen on all network interfaces or 'localhost'
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://modnaewebsite.onrender.com',
        changeOrigin: true,
        secure: true,  // Set this to 'true' if your target server uses SSL
      }
    }
  }
})
