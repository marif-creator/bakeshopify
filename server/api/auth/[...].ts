import Auth from '@auth/core'
import Google from '@auth/core/providers/google'

export default defineEventHandler(async (event) => {
  const authOptions = {
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      })
    ],
    secret: process.env.AUTH_SECRET
  }

  return await Auth(event, authOptions)
})
