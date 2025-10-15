import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  secret: useRuntimeConfig().auth.secret,
  providers: [
    {
      id: 'google',
      name: 'google',
      type: 'oauth',
      clientId: useRuntimeConfig().auth.google.clientId,
      clientSecret: useRuntimeConfig().auth.google.clientSecret,
      authorization: {
        url: 'https://accounts.google.com/o/oauth2/v2/auth',
        params: {
          scope: 'openid email profile',
          access_type: 'offline',
          prompt: 'consent'
        }
      },
      token: 'https://oauth2.googleapis.com/token',
      userinfo: 'https://openidconnect.googleapis.com/v1/userinfo',
      profile: (profile: any) => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          provider: 'google'
        }
      }
    }
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      return true
    },
    async jwt({ token, user, account }: any) {
      if (user) {
        token.provider = account?.provider
      }
      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.sub
        session.user.provider = token.provider
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/login'
  }
})