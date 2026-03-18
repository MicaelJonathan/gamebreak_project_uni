import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public', 
  server: {
    fs: {
      strict: false, // Permite acesso a arquivos fora do diretório raiz, necessário para o emuladorjs
    },
  },
})
