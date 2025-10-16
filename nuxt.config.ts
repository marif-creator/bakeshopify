// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxt/ui', '@sidebase/nuxt-auth'],
  vite: {
    plugins: [
      tailwindcss()
    ],
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      pexelsApiKey: process.env.PEXELS_API_KEY || 'your-pexels-api-key-here'
    },
    auth: {
      secret: process.env.AUTH_SECRET || 'your-secret-key',
      baseUrl: process.env.AUTH_BASE_URL || 'http://localhost:3000',
      origin: process.env.AUTH_ORIGIN || 'http://localhost:3000',
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret',
        callbackUrl: process.env.CALLBACKS_URL || 'http://localhost:3000'
      }
    }
  },
  auth: {
    defaultProvider: 'google',
    enableGlobalAppMiddleware: true,
    origin:"https://bakeshopify.vercel.app"
  }
})