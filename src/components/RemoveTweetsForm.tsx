import { ComponentProps, FC, useContext, useState } from 'react'

import { useRouter } from 'next/router'

import { Button, Center, Radio, Slider } from '@mantine/core'

import { useMutateTweets } from '../libs/twitter'
import { FormContext, FormDispatchContext } from '../pages/sendTweets'

export const RemoveTweetsForm: FC = () => {
  const { removeTweetsMutation } = useMutateTweets()
  const { limit } = useContext(FormContext)
  const { setCount, setLimit } = useContext(FormDispatchContext)

  const router = useRouter()

  // Fix rename ↓
  const [mode, setMode] = useState('No')

  const handleSubmit: ComponentProps<'form'>['onSubmit'] = async (e) => {
    e.preventDefault()

    if (mode === 'No') {
      router.push('/')
      return
    }

    // Fix Review ↓

    try {
      setCount(3)
      await removeTweetsMutation.mutateAsync(limit)
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setCount(4)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <Center mb={20}>
        <Radio.Group
          value={mode}
          onChange={setMode}
          name="remove liked tweets"
          label="Do you want to remove ♡"
          withAsterisk
        >
          <Radio value="Yes" label="Yes" />
          <Radio value="No" label="No" />
        </Radio.Group>
      </Center>

      {mode === 'Yes' && (
        <>
          <Slider
            defaultValue={1}
            value={limit}
            onChange={setLimit}
            min={1}
            max={limit}
            marks={[
              { value: 1, label: '1' },
              // Fix
              { value: limit!, label: `${limit}` },
            ]}
            mb={40}
          />
        </>
      )}

      <Center>
        <Button type="submit" mt={20}>
          {/* Fix ↓ */}
          {mode === 'Yes' ? 'Lets Remove' : 'Go Home'}
        </Button>
      </Center>
    </form>
  )
}
