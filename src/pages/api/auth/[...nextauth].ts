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

    async session({ session, token }) {
      session.user.oauth_token = token.oauth_token
      session.user.oauth_token_secret = token.oauth_token_secret
      session.user.account_id = token.account_id
      return session
    },
  },
}

export default NextAuth(authOptions)
