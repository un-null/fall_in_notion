/* eslint-disable unused-imports/no-unused-vars */
declare namespace NodeJS {
  interface ProcessEnv {
    readonly TWITTER_CONSUMER_KEY: string
    readonly TWITTER_CONSUMER_SECRET: string
    readonly NEXT_PUBLIC_SUPABASE_URL: string
    readonly NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    readonly SUPABASE_SERVICE_ROLE_KEY: string
    readonly SUPABASE_JWT_SECRET: string
    readonly NEXTAUTH_SECRET: string
  }
}
