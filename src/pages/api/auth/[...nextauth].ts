import { SupabaseAdapter } from '@next-auth/supabase-adapter'
import jwt from 'jsonwebtoken'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import TwitterProvider from 'next-auth/providers/twitter'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
      version: '1.0a',
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        return {
          ...token,
          account_id: account.providerAccountId,
          oauth_token: account.oauth_token,
          oauth_token_secret: account.oauth_token_secret,
        }
      }
      return token
    },

    async session({ session, token, user }) {
      console.log(user)

      const signingSecret = process.env.SUPABASE_JWT_SECRET
      if (signingSecret) {
        const payload = {
          aud: 'authenticated',
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: token.sub,
          email: token.email,
          role: 'authenticated',
        }
        session.supabaseAccessToken = jwt.sign(payload, signingSecret)
        session.user.oauth_token = token.oauth_token
        session.user.oauth_token_secret = token.oauth_token_secret
        session.user.account_id = token.account_id
      }
      return session
    },
  },
}

export default NextAuth(authOptions)
