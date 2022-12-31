import { Button, Center, Stack, Text } from '@mantine/core'
import { signIn, useSession } from 'next-auth/react'

import { DashBoard } from '../components'
import { Layout } from '../components/Layout'

const Home = () => {
  const { data: session } = useSession()

  return (
    <Layout label={!session ? 'Auth' : 'DashBoard'}>
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
    </Layout>
  )
}

export default Home
