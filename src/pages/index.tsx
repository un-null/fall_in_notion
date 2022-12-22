import { Button, Center, Flex, Stack, Text } from '@mantine/core'
import { signIn, signOut, useSession } from 'next-auth/react'

import { UserCard } from '../components'

export default function Home() {
  const { data: session } = useSession()

  return (
    <Center mt={40}>
      {!session?.user && (
        <Stack align="center">
          <Text>U need SignIn</Text>
          <Button onClick={() => signIn()}>SignIn</Button>
        </Stack>
      )}

      {session?.user && (
        <Stack align="center">
          <UserCard
            name={session.user.name}
            email={session.user.email}
            image={session.user.image}
          />

          <Flex direction="column" align="center">
            <Text>oauth_token :{session.user.oauth_token}</Text>
            <Text>oauth_token_secret : {session.user.oauth_token_secret}</Text>
          </Flex>

          <Button mt={20} onClick={() => signOut()}>
            SignOut
          </Button>
        </Stack>
      )}
    </Center>
  )
}
