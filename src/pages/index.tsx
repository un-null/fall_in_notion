import { ComponentProps, useState } from 'react'

import {
  Button,
  Center,
  Checkbox,
  NumberInput,
  Stack,
  Text,
} from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { signIn, signOut, useSession } from 'next-auth/react'

import { NotionForm, UserCard } from '../components'

const Home = () => {
  const { data: session } = useSession()
  const [limit, setLimit] = useState<number | undefined>(0)

  const mutateFunc = async () => {
    const res = await fetch('/api/twitter/getLikedTweet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application.json',
      },
      body: JSON.stringify(limit),
    })
    if (!res.ok) {
      throw new Error(`${res.status}:${res.statusText}`)
    }
    return res.json()
  }

  const mutation_func = useMutation(mutateFunc)

  const handleSubmit: ComponentProps<'form'>['onSubmit'] = async (e) => {
    e.preventDefault()
    mutation_func.mutate()
  }

  return (
    <Center mt={40}>
      {!session?.user && (
        <Stack align="center">
          <Text>U need SignIn</Text>
          <Button onClick={() => signIn()}>SignIn</Button>
        </Stack>
      )}

      {!session?.user.integration_token || !session?.user.database_id ? (
        <Stack>
          <NotionForm />

          <Button mt={20} onClick={() => signOut()}>
            SignOut
          </Button>
        </Stack>
      ) : (
        <Stack align="center">
          <UserCard
            name={session.user.name}
            email={session.user.email}
            image={session.user.image}
          />

          <form onSubmit={handleSubmit}>
            <Stack spacing="xs">
              <NumberInput
                name="limit"
                label="How many get ♡"
                description="From 1 to 20"
                withAsterisk
                hideControls
                value={limit}
                onChange={(value) => setLimit(value)}
              />

              {/* Fix ↓ */}
              <Checkbox
                label="Confirm maximum of 75 requests in 15 minutes for Twitter API usage"
                size="sm"
              />

              <Button type="submit" mt={20} disabled={!limit}>
                get ♡ tweets
              </Button>
            </Stack>
          </form>

          <Button mt={20} onClick={() => signOut()}>
            SignOut
          </Button>
        </Stack>
      )}
    </Center>
  )
}

export default Home
