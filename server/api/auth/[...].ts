import { NuxtAuthHandler } from '#auth'
import GoogleProvider from 'next-auth/providers/google';

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET || 'your-secret-key',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }) as any
  ],
   callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('signIn', { user, account, profile, email, credentials })
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log('redirect', { url, baseUrl })
      return baseUrl
    },
    async session({ session, user, token }) {
      console.log('session', { session, user, token })
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('jwt', { token, user, account, profile, isNewUser })
      return token
    }
  }
})