import {
  Button,
  Center,
  Checkbox,
  NumberInput,
  Stack,
  Text,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { signIn, useSession } from 'next-auth/react'

import { UserCard } from '../components'

export default function Home() {
  const { data: session } = useSession()

  const form = useForm<{ limit: number }>({
    initialValues: {
      limit: 0,
    },
    validate: {
      limit: (value) =>
        value > 20 ? 'There are too many. Keep it within 50' : null,
    },
  })

  const handleSubmit = async (value: { limit: number }) => {
    const limit = value.limit
    try {
      const res = await fetch('/api/twitter/getLikedTweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application.json',
        },
        body: JSON.stringify(limit),
      })
      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

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

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack spacing="xs">
              <NumberInput
                name="limit"
                label="How many get ♡"
                description="From 1 to 20"
                withAsterisk
                hideControls
                {...form.getInputProps('limit')}
              />

              {/* Fix ↓ */}
              <Checkbox
                label="Confirm maximum of 75 requests in 15 minutes for Twitter API usage"
                size="sm"
              />

              <Button type="submit" mt={20} disabled={!form.values.limit}>
                get ♡ tweets
              </Button>
            </Stack>
          </form>

          {/* <Button mt={20} onClick={() => signOut()}>
            SignOut
          </Button> */}
        </Stack>
      )}
    </Center>
  )
}
