import { createClient } from '@supabase/supabase-js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { NotionDatabase } from '../../types'

export const useMutateDatabaseInfo = () => {
  const queryClient = useQueryClient()

  const { data: session } = useSession()
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

  const updateDatabaseInfo = useMutation(
    async (databaseInfo: NotionDatabase) => {
      const { data, error } = await supabase
        .from('users')
        .update(databaseInfo)
        .eq('id', session?.user.user_id)
        .select('integration_token, database_id')

      if (error) throw new Error(`${error.code} : ${error.message}`)

      return data
    },
    {
      onSuccess: (data) => {
        if (data) {
          queryClient.setQueryData(['databaseInfo'], data[0])
        }
      },
      onError: (err: Error) => {
        alert(err.message)
      },
    }
  )
  return {
    updateDatabaseInfo,
  }
}
