import { Button, Center, Stack, Text } from '@mantine/core'
import { signIn, useSession } from 'next-auth/react'

import { DashBoard } from '../components/DashBoard'

const Home = () => {
  const { data: session } = useSession()

  return (
    <Center mt={40}>
      {!session?.user ? (
        <Stack align="center">
          <Text>U need SignIn</Text>
          <Button onClick={() => signIn()}>SignIn</Button>
        </Stack>
      ) : (
        <DashBoard />
      )}
    </Center>
  )
}

export default Home
