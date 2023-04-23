'use client'
import { ComponentProps, FC, useState } from 'react'

import { redirect } from 'next/navigation'

import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'

import { useMutateDatabaseInfo } from '../libs/notion'

// Fix name ↓
type Props = {
  mode: 'register' | 'edit'
  integration?: string
  database?: string
}

export const NotionForm: FC<Props> = ({
  mode,
  integration = '',
  database = '',
}) => {
  const [iToken, setIToken] = useState(integration)
  const [databaseId, setDatabaseId] = useState(database)

  const { updateDatabaseInfo } = useMutateDatabaseInfo()

  const handleSubmit: ComponentProps<'form'>['onSubmit'] = () => {
    updateDatabaseInfo.mutate({
      integration_token: iToken,
      database_id: databaseId,
    })
    redirect('/app')
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {mode === 'register' && (
        <h4 className="my-10 text-2xl text-center font-bold">
          Connect to Notion
        </h4>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="text-xs font-medium">Integration Token</label>
          <input
            type="text"
            required
            placeholder="secret_"
            value={iToken}
            onChange={(e) => setIToken(e.target.value)}
            className="w-full mt-2 px-3 py-2 mb-4 text-sm bg-transparent outline-none border focus:border-notion-red rounded"
          />
        </div>
        <div>
          <label className="text-xs font-medium">Database ID</label>
          <input
            type="text"
            required
            value={databaseId}
            onChange={(e) => setDatabaseId(e.target.value)}
            className="w-full mt-2 px-3 py-2 mb-4 text-sm bg-transparent outline-none border focus:border-notion-red rounded"
          />
        </div>

        <button
          type="submit"
          disabled={iToken === '' || databaseId === ''}
          className="w-full bg-notion-red hover:bg-red-500 mt-4 mx-auto py-1 px-4 sm:py-2 rounded text-sm font-medium text-white disabled:bg-gray-300"
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
      </form>
    </div>
  )
}
