import { ComponentProps, FC, useState } from 'react'

import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { useSession } from 'next-auth/react'

import { useMutateDatabaseInfo } from '../libs/notion'

// Fix name ↓
type Props = {
  mode: 'register' | 'edit'
}

export const NotionForm: FC<Props> = ({ mode }) => {
  const { data: session } = useSession()

  const [iToken, setIToken] = useState(session?.user.integration_token)
  const [databaseId, setDatabaseId] = useState(session?.user.database_id)

  const { updateDatabaseInfo } = useMutateDatabaseInfo()

  const handleSubmit: ComponentProps<'form'>['onSubmit'] = (e) => {
    e.preventDefault()

    try {
      updateDatabaseInfo.mutate({
        integration_token: iToken,
        database_id: databaseId,
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

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-stretch mt-5">
          <label className="text-xs font-medium">Integration Token</label>
          <input
            type="text"
            required
            placeholder="secret_"
            value={iToken}
            onChange={(e) => setIToken(e.target.value)}
            className="w-full px-3 py-2 mt-1 my-4 text-sm bg-transparent outline-none border focus:border-notion-red rounded"
          />
          <label className="text-xs font-medium">Database ID</label>
          <input
            type="text"
            required
            placeholder="secret_"
            value={databaseId}
            onChange={(e) => setDatabaseId(e.target.value)}
            className="w-full px-3 py-2 mt-1 text-sm bg-transparent outline-none border focus:border-notion-red rounded"
          />

          <button
            type="submit"
            disabled={iToken === '' || databaseId === ''}
            className="w-full bg-notion-red hover:bg-red-500 mt-4 mx-auto py-1 px-4 rounded text-sm font-medium text-white disabled:bg-gray-300"
          >
            {mode === 'register' ? 'Register' : 'Update'}
          </button>
          <div className="mt-2 flex justify-center items-center space-x-1 text-gray-500 hover:text-notion-red">
            <QuestionMarkCircledIcon width={12} height={12} />
            <a
              href="https://developers.notion.com/docs/create-a-notion-integration"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-xs"
            >
              What is Integration Token, Database ID
            </a>
          </div>
        </div>
      </form>
    </div>
  )
}
