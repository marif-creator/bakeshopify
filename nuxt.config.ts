// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { baseURL } from "process";
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
      pexelsApiKey: process.env.PEXELS_API_KEY || 'your-pexels-api-key-here',
    },
  },
  auth:{
    baseURL: (process.env.ORIGIN || 'http://localhost:3000') + '/api/auth',
    providers: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id-here',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret-here'
      },
    },
  }
})