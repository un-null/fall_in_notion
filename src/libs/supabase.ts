import { createClient } from '@supabase/supabase-js'
import { useSession } from 'next-auth/react'

export const useSpabaseClient = () => {
  const { data: session } = useSession()

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${session?.supabaseAccessToken}`,
        },
      },
    }
  )
}
