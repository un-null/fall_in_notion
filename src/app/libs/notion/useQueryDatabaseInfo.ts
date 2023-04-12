import { createClient } from '@supabase/supabase-js'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export const useQueryDatabaseInfo = () => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const supabaseAccessToken = session?.supabaseAccessToken

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseAccessToken}`,
        },
      },
    }
  )

  const getDatabaseInfo = async () => {
    if (session?.user) {
      const { data, error } = await supabase
        .from('users')
        .select('integration_token, database_id')
        .eq('id', session?.user.user_id)
        .single()

      if (error) throw new Error(`${error.code} : ${error.message}`)

      return data
    }
    // Fix need auth ? ↓
    return alert('user does not exist')
  }

  return useQuery({
    queryKey: ['databaseInfo'],
    queryFn: getDatabaseInfo,
    staleTime: Infinity,
    onSuccess: (data) => {
      if (data) {
        queryClient.setQueryData(['databaseInfo'], data)
      }
    },
  })
}
