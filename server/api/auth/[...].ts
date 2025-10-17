import { NuxtAuthHandler } from '#auth'
import Google from '@auth/core/providers/google';

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET || 'your-secret-key',
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }) as any
  ],
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
})