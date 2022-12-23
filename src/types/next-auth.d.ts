import { DefaultSession } from 'next-auth'

/* eslint-disable unused-imports/no-unused-vars */
declare module 'next-auth' {
  interface Account {
    account_id?: string
    oauth_token?: string
    oauth_token_secret?: string
  }
  interface Session {
    supabaseAccessToken?: string
    user: {
      account_id?: string
      oauth_token?: string
      oauth_token_secret?: string
      address: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    account_id?: string
    oauth_token?: string
    oauth_token_secret?: string
  }
}
