import { ComponentProps, FC, useState } from 'react'

import { Button, Checkbox, NumberInput, Stack } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { signOut, useSession } from 'next-auth/react'

import { useQueryDatabaseInfo } from '../libs/notion'
import { NotionForm } from './NotionForm'
import { UserCard } from './UserCard'

export const DashBoard: FC = () => {
  const [limit, setLimit] = useState<number | undefined>(0)
  const { data: session } = useSession()
  const { data: databaseInfoCache } = useQueryDatabaseInfo()

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

    alert('♡')
  }

  const mutation_func = useMutation(mutateFunc)

  const handleSubmit: ComponentProps<'form'>['onSubmit'] = async (e) => {
    e.preventDefault()
    mutation_func.mutate()
  }

  // console.log(databaseInfo)

  return (
    <div>
      {!databaseInfoCache?.integration_token ||
      !databaseInfoCache?.database_id ? (
        <Stack>
          <NotionForm />

          <Button mt={20} onClick={() => signOut()}>
            SignOut
          </Button>
        </Stack>
      ) : (
        <Stack align="center">
          {/* Fix ? ↓ */}
          <UserCard
            name={session?.user.name}
            email={session?.user.email}
            image={session?.user.image}
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

          {/* Fix Header? ↓ */}
          <Button mt={20} onClick={() => signOut()}>
            SignOut
          </Button>
        </Stack>
      )}
    </div>
  )
}
