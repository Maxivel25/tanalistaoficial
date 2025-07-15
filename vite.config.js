import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // O plugin VitePWA é adicionado aqui para "turbinar" o seu app
    VitePWA({
      // Esta opção faz com que o app se atualize automaticamente
      // quando uma nova versão for publicada.
      registerType: 'autoUpdate',
      
      // Configura o manifesto do PWA, que diz ao navegador como o app deve se comportar.
      manifest: {
        name: 'Tá na Lista!',
        short_name: 'Tá na Lista',
        description: 'Organize suas listas de compras com facilidade e nunca mais esqueça um item.',
        theme_color: '#8B5CF6', // Um roxo mais claro para a barra de título no Android
        background_color: '#ffffff',
        display: 'standalone', // Faz o app abrir sem a barra de endereço do navegador
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            // Este ícone "maskable" garante que o logo se adapte bem
            // a diferentes formatos de ícones no Android.
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      
      // Define quais arquivos devem ser salvos para o uso offline.
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3,woff,woff2}'],
      },
    }),
  ],
})
