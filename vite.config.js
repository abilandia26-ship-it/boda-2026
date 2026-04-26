import { defineConfig } from 'vite'

export default defineConfig({
  // Si tu repo se llama 'boda-2026', deja esta línea. 
  // Si lo vas a publicar en la raíz (sin /boda-2026/), cámbialo a '/'
  base: '/boda-2026/', 
  build: {
    outDir: 'dist',
  }
})
