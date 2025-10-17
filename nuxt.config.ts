// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { baseURL } from "process";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@sidebase/nuxt-auth', '@nuxt/image', '@nuxt/ui'],
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
  auth: {
    globalAppMiddleware: true,
    isEnabled: true,
    disableServerSideAuth: true,
    originEnvKey: 'AUTH_ORIGIN',
    baseURL: process.env.ORIGIN? `${process.env.ORIGIN}/api/auth` : 'http://localhost:3000/api/auth',
    provider: {
      type: 'authjs',
      trustHost: false,
      defaultProvider: 'google',
      addDefaultCallbackUrl: true
    },
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
    }
  }
})