import { FC, FormEvent } from 'react'

import { Anchor, Button, Flex, Stack, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconQuestionCircle } from '@tabler/icons'
import { useSession } from 'next-auth/react'

import { useMutateDatabaseInfo } from '../libs/notion'
import { NotionDatabase } from '../types'

// Fix name ↓
type FormValue = Required<NotionDatabase>

export const NotionForm: FC = () => {
  const { data: session } = useSession()

  const { updateDatabaseInfo } = useMutateDatabaseInfo()

  const form = useForm<FormValue>({
    initialValues: {
      integration_token: '',
      database_id: '',
    },

    validate: {
      integration_token: (value) =>
        /^secret_/.test(value) ? null : 'Invalid integration_token',
      database_id: (value) => (value ? null : 'Invalid database_id'),
    },
  })

  const handleSubmit = (values: FormValue, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateDatabaseInfo.mutate({
      integration_token: values.integration_token,
      database_id: values.database_id,
    })
  }

  return (
    <div>
      <Text mt={20} size="xl" weight="bold">
        Notion Form
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack align="stretch" justify="center">
          <TextInput
            name="integration_token"
            label="Integration Token"
            placeholder="secret_"
            withAsterisk
            defaultValue={session?.user.integration_token}
            {...form.getInputProps('integration_token')}
          />
          <TextInput
            name="database_id"
            label="Database ID"
            withAsterisk
            defaultValue={session?.user.database_id}
            {...form.getInputProps('database_id')}
          />

          <Button
            type="submit"
            mt={20}
            disabled={
              !form.values.integration_token || !form.values.database_id
            }
          >
            Register
          </Button>
          <Flex
            gap={5}
            justify="center"
            align="center"
            c="dark"
            sx={{
              cursor: 'pointer',
              ':hover': { color: '#1DA1F2' },
            }}
          >
            <IconQuestionCircle size={16} />
            <Anchor
              href="https://developers.notion.com/docs/create-a-notion-integration"
              target="_blank"
              rel="noopener noreferrer"
              color="dark"
              sx={{
                ':hover': { color: '#1DA1F2' },
              }}
            >
              What is Integration Token, Database ID
            </Anchor>
          </Flex>
        </Stack>
      </form>
    </div>
  )
}
