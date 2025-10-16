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
      authBaseUrl: process.env.ORIGIN ? `${process.env.ORIGIN}/api/auth` : 'http://localhost:3000/api/auth',
      authGlobalAppMiddleware: {
        isEnabled: true,
        allow404WithoutAuth: true
      }
    },
    authSecret: process.env.AUTH_SECRET,
    origin: process.env.ORIGIN,
    authProvider: {
      type: 'authjs'
    },
    authProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id-here',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret-here',
        authorization: {
          params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code'
          }
        }
      }
    },
    authSession: {
      enableRefreshOnWindowFocus: false,
      enableRefreshTokenRefresh: true
    }
  },
})