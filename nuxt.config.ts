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
    }
  },
  auth: {
    provider: {
      type: 'authjs'
    },
    defaultProvider: 'google',
    enableGlobalAppMiddleware: false,
    enableSessionRefresh: false,
    origin: process.env.AUTH_ORIGIN || 'http://localhost:3000',
    baseUrl: process.env.AUTH_BASE_URL || 'http://localhost:3000'
  }
})