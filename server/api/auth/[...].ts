import { NuxtAuthHandler } from '#auth'
import GoogleProvider from "next-auth/providers/google";

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET || 'your-secret-key',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }) as any
  ]
})