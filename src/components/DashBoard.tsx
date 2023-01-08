import { FC } from 'react'

import { Center, Container, SimpleGrid, Stack } from '@mantine/core'
import { useSession } from 'next-auth/react'

import { useQueryDatabaseInfo } from '../libs/notion'
import { useQueryLimit } from '../libs/twitter'
import { ActionCard } from './ActionCard'
import { NotionForm } from './NotionForm'
import { StorageCard } from './StorageCard'
import { UserCard } from './UserCard'

export const DashBoard: FC = () => {
  const { data: session } = useSession()
  const { data: databaseInfoCache } = useQueryDatabaseInfo()
  const { data: limitCache } = useQueryLimit()

  const actionArr = [{ name: 'send' }, { name: 'delete' }]

  return (
    <Container w="100%">
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

          <SimpleGrid
            cols={2}
            breakpoints={[{ maxWidth: 430, cols: 1 }]}
            w="100%"
          >
            {actionArr.map((action, index) => (
              <ActionCard key={index} name={action.name} />
            ))}
          </SimpleGrid>
        </Stack>
      )}
    </Container>
  )
}
