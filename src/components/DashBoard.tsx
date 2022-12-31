import { FC } from 'react'

import { Grid, Stack } from '@mantine/core'
import { useSession } from 'next-auth/react'

import { useQueryDatabaseInfo } from '../libs/notion'
import { ActionCard } from './ActionCard'
import { NotionForm } from './NotionForm'
import { StorageCard } from './StorageCard'
import { UserCard } from './UserCard'

export const DashBoard: FC = () => {
  const { data: session } = useSession()
  const { data: databaseInfoCache } = useQueryDatabaseInfo()

  // Fix Rename ? ↓
  const actionArr = [
    { name: 'Send ♡ To Notion' },
    { name: 'Remove ♡ On Twitter' },
  ]

  return (
    <div>
      {!databaseInfoCache?.integration_token ||
      !databaseInfoCache?.database_id ? (
        <Stack mt={40}>
          <NotionForm />
        </Stack>
      ) : (
        <Stack align="center">
          <UserCard
            name={session?.user.name}
            email={session?.user.email}
            image={session?.user.image}
          />

          <StorageCard />

          <Grid gutter={10}>
            {actionArr.map((action, index) => (
              <Grid.Col
                key={index}
                span={6}
                sx={{ ':hover': { cursor: 'pointer' } }}
              >
                <ActionCard name={action.name} />
              </Grid.Col>
            ))}
          </Grid>
          {/* <RetrieveTweetsForm /> */}
        </Stack>
      )}
    </div>
  )
}
