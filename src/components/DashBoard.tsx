import { FC } from 'react'

import { Center, Grid, Stack } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { useQueryDatabaseInfo } from '../libs/notion'
import { LocalObj } from '../types'
import { ActionCard } from './ActionCard'
import { NotionForm } from './NotionForm'
import { StorageCard } from './StorageCard'
import { UserCard } from './UserCard'

export const DashBoard: FC = () => {
  const { data: session } = useSession()
  const { data: databaseInfoCache } = useQueryDatabaseInfo()
  const { data: limitCache } = useQuery({
    queryKey: ['limit'],
    queryFn: () => {
      const item = localStorage.getItem('limit')

      if (!item) return 0

      const limitObj: LocalObj = JSON.parse(item)

      if (new Date().getTime() > Number(limitObj.expiry)) {
        localStorage.removeItem('limit')
        return 0
      }

      return Number(limitObj.value)
    },
  })

  const actionArr = [{ name: 'send' }, { name: 'delete' }]

  return (
    <div>
      {!databaseInfoCache?.integration_token ||
      !databaseInfoCache?.database_id ? (
        <Center mt={40}>
          <NotionForm mode="register" />
        </Center>
      ) : (
        <Stack align="center">
          <UserCard
            name={session?.user.name}
            email={session?.user.email}
            image={session?.user.image}
          />

          <StorageCard limit={limitCache ? limitCache : 0} />

          <Grid gutter={10}>
            {actionArr.map((action, index) => (
              <Grid.Col key={index} span={6}>
                <ActionCard name={action.name} />
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      )}
    </div>
  )
}
