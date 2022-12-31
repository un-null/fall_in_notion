import { ComponentProps, FC, useState } from 'react'

import {
  Button,
  Checkbox,
  Divider,
  NumberInput,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { IconHeart } from '@tabler/icons'
import { useMutation } from '@tanstack/react-query'

// Fix rename ↓
export const RetrieveTweetsForm: FC = () => {
  const [limit, setLimit] = useState<number | undefined>(0)

  const mutateFunc = async () => {
    await fetch('/api/twitter/getLikedTweet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application.json',
      },
      body: JSON.stringify(limit),
    }).then((res) => {
      if (res.ok) {
      } else {
        throw new Error('Error occurred')
      }
    })
  }

  const mutation_func = useMutation(mutateFunc)

  const handleSubmit: ComponentProps<'form'>['onSubmit'] = async (e) => {
    e.preventDefault()
    mutation_func.mutate()
  }
  return (
    <Paper shadow="sm" radius="md" p="lg">
      <form onSubmit={handleSubmit}>
        <Divider
          my={20}
          size="md"
          color="#1DA1F2"
          labelPosition="center"
          label={
            <Title
              order={3}
              color="dark.7"
              display="inline-flex"
              align="center"
            >
              Retrieve
              <Text span ml={4}>
                <IconHeart
                  style={{ fill: '#f91980' }}
                  color="#f91980"
                  size={20}
                />
              </Text>
            </Title>
          }
        />
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
    </Paper>
  )
}
