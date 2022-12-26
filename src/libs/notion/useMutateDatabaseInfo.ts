import { createClient } from '@supabase/supabase-js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { NotionDatabase } from '../../types'
// import { useSession } from '../session'

export const useMutateDatabaseInfo = () => {
  const queryClient = useQueryClient()

  // const [session] = useSession({})
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

  const registerDatabaseInfo = useMutation(
    async (databaseInfo: NotionDatabase) => {
      const { data, error } = await supabase
        .from('users')
        .insert(databaseInfo)
        .eq('id', session?.user.user_id)

      if (error) throw new Error(`${error.code} : ${error.message}`)
      return data
    },
    {
      onSuccess: (res) => {
        queryClient.setQueryData(['databaseInfo'], res[0])
      },
      // Fix any ↓
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )

  const updateDatabaseInfo = useMutation(
    async (databaseInfo: NotionDatabase) => {
      const { data, error } = await supabase
        .from('users')
        .update(databaseInfo)
        .eq('id', session?.user.user_id)

      if (error) throw new Error(`${error.code} : ${error.message}`)
      return data
    },
    {
      onSuccess: (res) => {
        queryClient.setQueryData(['databaseInfo'], res[0])
      },
      // Fix any ↓
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )
  return {
    registerDatabaseInfo,
    updateDatabaseInfo,
  }
}
