import { SupabaseAdapter } from '@next-auth/supabase-adapter'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import TwitterProvider from 'next-auth/providers/twitter'
import { TwitterApi } from 'twitter-api-v2'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_PUBLIC_SECRET,
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
  jwt: {
    secret: process.env.NEXT_PUBLIC_SECRET,
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

    async session({ session, token }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET
      if (signingSecret) {
        const payload = {
          aud: 'authenticated',
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: token.sub,
          email: token.email,
          role: 'authenticated',
        }

        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          {
            global: {
              headers: {
                Authorization: `Bearer ${jwt.sign(payload, signingSecret)}`,
              },
            },
          }
        )

        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('email', session.user.email)
          .single()

        session.supabaseAccessToken = jwt.sign(payload, signingSecret)
        session.user.oauth_token = token.oauth_token
        session.user.oauth_token_secret = token.oauth_token_secret
        session.user.account_id = token.account_id

        session.user.user_id = data?.id
        session.user.integration_token = data?.integration_token
        session.user.database_id = data?.database_id
      }

      const twitter = new TwitterApi({
        appKey: process.env.TWITTER_CONSUMER_KEY,
        appSecret: process.env.TWITTER_CONSUMER_SECRET,
        accessToken: session.user.oauth_token || '',
        accessSecret: session.user.oauth_token_secret || '',
      })
      const user = await twitter.v1.user({
        user_id: session.user.account_id ? session.user.account_id : '',
      })

      session.user.name = user.screen_name

      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
