'use client'
import { FC } from 'react'

import { useSession } from 'next-auth/react'

import { ActionCard } from './ActionCard'
import { NotionForm } from './NotionForm'
import { StorageCard } from './StorageCard'
import { UserCard } from './UserCard'
import { Action } from '../../types'
import { useQueryDatabaseInfo } from '../libs/notion'
import { useQueryLimit } from '../libs/twitter'

export const DashBoard: FC = () => {
  const { data: session } = useSession()
  const { data: databaseInfoCache } = useQueryDatabaseInfo()
  const { data: limitCache } = useQueryLimit()

  const isLimit = limitCache === 75
  const actionArr: Action[] = [{ name: 'send', isLimit }, { name: 'delete' }]

  return (
    <div className="w-full mt-10">
      {!databaseInfoCache?.integration_token ||
      !databaseInfoCache?.database_id ? (
        <div className="mt-10 grid place-items-center">
          <NotionForm mode="register" />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <UserCard
            name={session?.user.name}
            email={session?.user.email}
            image={session?.user.image}
          />

          <StorageCard limit={limitCache ? limitCache : 0} />

          <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 my-10">
            {actionArr.map((action, index) => (
              <ActionCard key={index} name={action.name} isLimit={isLimit} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
