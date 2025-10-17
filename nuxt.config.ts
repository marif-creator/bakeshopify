// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['nuxt-vue3-google-signin','@nuxt/image', '@nuxt/ui'],
  vite: {
    plugins: [
      tailwindcss()
    ],
  },
  css: ['~/assets/css/main.css'],
  sourcemap: {
    server: true,
    client: true
  },
  runtimeConfig: {
    public: {
      pexelsApiKey: process.env.PEXELS_API_KEY || 'your-pexels-api-key-here',

    },
  },
  googleSignIn: {
    clientId: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id-here',
  }
})