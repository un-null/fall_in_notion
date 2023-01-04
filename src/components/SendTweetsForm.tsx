import { ComponentProps, FC, useContext, useState } from 'react'

import {
  Button,
  Flex,
  Loader,
  NumberInput,
  Slider,
  Stack,
  Text,
} from '@mantine/core'

import { useMutateTweets } from '../libs/twitter'
import { CounterContext, CounterDispatchContext } from '../pages/sendTweets'

// Fix rename ↓
export const SendTweetsForm: FC = () => {
  const [limit, setLimit] = useState<number | undefined>(1)
  const { sendTweetsMutation } = useMutateTweets()
  const count = useContext(CounterContext)
  const setCount = useContext(CounterDispatchContext)

  console.log(count)

  const handleSubmit: ComponentProps<'form'>['onSubmit'] = async (e) => {
    e.preventDefault()

    // Fix Review ↓
    try {
      setCount(1)
      await sendTweetsMutation.mutateAsync(limit)
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setCount(2)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {count === 0 && (
        <>
          <Slider
            defaultValue={5}
            value={limit}
            onChange={setLimit}
            min={1}
            max={75}
            marks={[
              { value: 1, label: '1' },
              { value: 25, label: '25' },
              { value: 50, label: '50' },
              { value: 75, label: '75' },
            ]}
            mb={40}
          />

          <Flex direction="column" justify="center" align="center" gap={20}>
            <NumberInput
              value={limit}
              onChange={(value) => setLimit(value)}
              w={60}
            />
            <Button type="submit">Next</Button>
          </Flex>
        </>
      )}

      {count === 1 && (
        <Stack justify="center" align="center" mt={20}>
          {/* Fix color */}
          <>
            <Text weight="bold">Now Sending...</Text>
            <Loader variant="bars" color="pink" size="sm" />
          </>
        </Stack>
      )}

      {(sendTweetsMutation.isSuccess || count === 2) && (
        <>
          <Text>Hello World __{count}</Text>
        </>
      )}
    </form>
  )
}
