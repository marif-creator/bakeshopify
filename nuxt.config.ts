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
  sourcemap: {
    server: true,
    client: true
  },
  runtimeConfig: {
    public: {
      pexelsApiKey: process.env.PEXELS_API_KEY || 'your-pexels-api-key-here',
      authGlobalAppMiddleware: {
        isEnabled: true,
        allow404WithoutAuth: true
      },

    },
    authSecret: process.env.AUTH_SECRET,
    authSession: {
      enableRefreshOnWindowFocus: false,
      enableRefreshTokenRefresh: true
    }
  },
  auth: {
    baseURL: process.env.ORIGIN ? `${process.env.ORIGIN}/api/auth` : 'http://localhost:3000/api/auth',
    provider: {
      type: 'authjs'
    },
    globalAppMiddleware: {
      isEnabled: true
    },
    enableGlobalAppMiddleware: true,
    defaultProvider: 'google',
  }
})