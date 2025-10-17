import { NuxtAuthHandler } from '#auth'
import Google from '@auth/core/providers/google';

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET || 'your-secret-key',
  providers: [
    // @ts-expect-error
    Google.default({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }) as any
  ]
})