import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  define: {
    'process.env': {}, // evita erro com 'process'
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: ['os', 'path', 'fs'] // impede que tente empacotar módulos nativos
    }
  }
});
