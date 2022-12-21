import { Avatar, Button, Center, Flex, Stack, Text } from '@mantine/core'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()
  console.log(session)

  return (
    <Center mt={40}>
      {!session && (
        <Stack align="center">
          <Text>U need SignIn</Text>
          <Button onClick={() => signIn()}>SignIn</Button>
        </Stack>
      )}

      {session && (
        <Stack align="center">
          <Flex justify="space-between" align="center" w={400} h={200}>
            <Avatar src={session.user?.image ? session.user.image : null} />
            <div>
              <Text>Hello {session.user?.name}</Text>
              <Text>Hello {session.user?.email}</Text>
            </div>
          </Flex>

          <Button onClick={() => signOut()}>SignOut</Button>
        </Stack>
      )}
    </Center>
  )
}
