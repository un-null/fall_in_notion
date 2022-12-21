import { DefaultSession } from 'next-auth'

/* eslint-disable unused-imports/no-unused-vars */
declare module 'next-auth' {
  interface Account {
    oauth_token?: string
    oauth_token_secret?: string
  }
  interface Session {
    user: {
      oauth_token?: string
      oauth_token_secret?: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    oauth_token?: string
    oauth_token_secret?: string
  }
}
