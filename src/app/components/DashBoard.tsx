'use client'
import { FC } from 'react'

import { useSession } from 'next-auth/react'

import { ActionCard } from './ActionCard'
import { Aside } from './Layout/Aside'
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
    <div className="w-full flex h-full">
      <Aside />
      {!databaseInfoCache?.integration_token ||
      !databaseInfoCache?.database_id ? (
        <div className="mt-10 grid place-items-center">
          <NotionForm mode="register" />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center mt-5">
          <UserCard
            name={session?.user.name}
            email={session?.user.email}
            image={session?.user.image}
          />

          <StorageCard limit={limitCache ? limitCache : 0} />

          <div className="w-full max-w-2xl grid grid-cols-2 gap-4 my-10 md:hidden">
            {actionArr.map((action, index) => (
              <ActionCard key={index} name={action.name} isLimit={isLimit} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
