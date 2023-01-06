import { ComponentProps, FC, useContext } from 'react'

import { useRouter } from 'next/router'

import {
  Button,
  Center,
  Flex,
  Loader,
  NumberInput,
  Slider,
  Stack,
  Text,
} from '@mantine/core'

import { useMutateTweets, useQueryLimit } from '../libs/twitter'
import { FormContext, FormDispatchContext } from '../pages/sendTweets'

export const SendTweetsForm: FC = () => {
  const router = useRouter()

  const { count, limit } = useContext(FormContext)
  const { setCount, setLimit } = useContext(FormDispatchContext)

  const { data: limitCache } = useQueryLimit()
  const { sendTweetsMutation } = useMutateTweets()

  const max = limitCache ? 75 - limitCache : 75
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
    <div>
      <form onSubmit={handleSubmit}>
        {count === 0 && (
          <>
            <Slider
              defaultValue={5}
              value={limitCache}
              onChange={setLimit}
              min={1}
              max={max}
              marks={
                max === 75
                  ? [
                      { value: 1, label: '1' },
                      { value: 25, label: '25' },
                      { value: 50, label: '50' },
                      { value: 75, label: '75' },
                    ]
                  : [
                      { value: 1, label: '1' },
                      { value: max, label: `${max}` },
                    ]
              }
              mb={40}
            />

            <Flex direction="column" justify="center" align="center" gap={20}>
              <NumberInput
                value={limit}
                onChange={(value) => setLimit(value)}
                w={60}
                min={1}
                max={max}
              />
              <Button type="submit">Next</Button>
            </Flex>
          </>
        )}
      </form>

      {(count === 1 || sendTweetsMutation.isLoading) && (
        <Stack justify="center" align="center" mt={20}>
          {/* Fix color */}
          <>
            <Text weight="bold">Now Sending...</Text>
            <Loader variant="bars" color="pink" size="sm" />
          </>
        </Stack>
      )}

      {count === 2 && (
        <Center>
          <Button onClick={() => router.push('/')}>Go Home</Button>
        </Center>
      )}
    </div>
  )
}
