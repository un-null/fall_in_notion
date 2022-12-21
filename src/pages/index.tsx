import { Avatar, Button, Center, Flex, Stack, Text } from '@mantine/core'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

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
              <Text>name : {session.user?.name}</Text>
              <Text>email : {session.user?.email}</Text>
              <Text>oauth_token :{session.user?.oauth_token}</Text>
              <Text>
                oauth_token_secret : {session.user?.oauth_token_secret}
              </Text>
            </div>
          </Flex>

          <Button onClick={() => signOut()}>SignOut</Button>
        </Stack>
      )}
    </Center>
  )
}
