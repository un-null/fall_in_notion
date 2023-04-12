import { FC, FormEvent } from 'react'

import { useSession } from 'next-auth/react'

import { NotionDatabase } from '../../types'
import { useMutateDatabaseInfo } from '../libs/notion'

// Fix name ↓
type FormValue = Required<NotionDatabase>
type Props = {
  mode: 'register' | 'edit'
}

export const NotionForm: FC<Props> = ({ mode }) => {
  const { data: session } = useSession()

  const { updateDatabaseInfo } = useMutateDatabaseInfo()

  // const form = useForm<FormValue>({
  //   initialValues: {
  //     integration_token: session?.user.integration_token
  //       ? session.user.integration_token
  //       : '',
  //     database_id: session?.user.database_id ? session.user.database_id : '',
  //   },

  //   validate: {
  //     integration_token: (value) =>
  //       /^secret_/.test(value) ? null : 'Invalid integration_token',
  //     database_id: (value) => (value ? null : 'Invalid database_id'),
  //   },
  // })

  const handleSubmit = (values: FormValue, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      updateDatabaseInfo.mutate({
        integration_token: values.integration_token,
        database_id: values.database_id,
      })
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div>
      {mode === 'register' && (
        <p className="mt-5 text-xl font-bold">Notion Form</p>
      )}

      <form>
        <div className="flex flex-col justify-center items-stretch mt-5">
          <label className="text-xs">Integration Token</label>
          <input
            type="text"
            required
            placeholder="secret_"
            value={session?.user.integration_token}
            className="w-full px-3 py-2 my-2 text-sm bg-transparent outline-none border focus:border-red-400 rounded"
          />
          <label className="text-xs">Database ID</label>
          <input
            type="text"
            required
            placeholder="secret_"
            value={session?.user.database_id}
            className="w-full px-3 py-2 mt-2 text-sm bg-transparent outline-none border focus:border-red-400 rounded"
          />

          <button
            type="submit"
            // disabled={
            //   !form.values.integration_token || !form.values.database_id
            // }
            className="w-fit bg-red-400 mt-4 mx-auto py-1 px-4 rounded text-sm"
          >
            {mode === 'register' ? 'Register' : 'Update'}
          </button>
          <div className="mt-2 flex justify-center items-center gap-2 hover:text-red-400">
            {/* <IconQuestionCircle size={16} /> */}
            <p className="text-sm font-semibold">?</p>
            <a
              href="https://developers.notion.com/docs/create-a-notion-integration"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sm"
            >
              What is Integration Token, Database ID
            </a>
          </div>
        </div>
      </form>
    </div>
  )
}
