import { FC, FormEvent } from 'react'

import {
  Anchor,
  Button,
  createStyles,
  Flex,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconEdit, IconQuestionCircle } from '@tabler/icons'
import { useSession } from 'next-auth/react'

import { useMutateDatabaseInfo } from '../libs/notion'
import { NotionDatabase } from '../types'

// Fix name ↓
type FormValue = Required<NotionDatabase>
type Props = {
  mode: 'register' | 'edit'
}

const useStyles = createStyles((theme) => ({
  select: {
    cursor: 'pointer',
    ':hover': { color: theme.colors.cyan[6] },
  },
}))

export const NotionForm: FC<Props> = ({ mode }) => {
  const { classes } = useStyles()
  const { data: session } = useSession()

  const { updateDatabaseInfo } = useMutateDatabaseInfo()

  const form = useForm<FormValue>({
    initialValues: {
      integration_token: session?.user.integration_token
        ? session.user.integration_token
        : '',
      database_id: session?.user.database_id ? session.user.database_id : '',
    },

    validate: {
      integration_token: (value) =>
        /^secret_/.test(value) ? null : 'Invalid integration_token',
      database_id: (value) => (value ? null : 'Invalid database_id'),
    },
  })

  const handleSubmit = (values: FormValue, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      updateDatabaseInfo.mutate({
        integration_token: values.integration_token,
        database_id: values.database_id,
      })

      showNotification({
        title: 'Success',
        message: 'Update your Database Infomation',
        color: 'green',
        icon: <IconEdit />,

        // Fix responsive
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.green[7],
          },
        }),
      })
    } catch (error: any) {
      showNotification({
        title: 'Error',
        message: 'Try again!',
        color: 'red',

        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.green[7],
          },
        }),
      })
    }
  }

  return (
    <div>
      {mode === 'register' && (
        <Text mt={20} size="xl" weight="bold">
          Notion Form
        </Text>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack align="stretch" justify="center" mt={20}>
          <TextInput
            name="integration_token"
            label="Integration Token"
            placeholder="secret_"
            withAsterisk
            {...form.getInputProps('integration_token')}
          />
          <TextInput
            name="database_id"
            label="Database ID"
            withAsterisk
            {...form.getInputProps('database_id')}
          />

          <Button
            type="submit"
            mt={20}
            color="cyan"
            disabled={
              !form.values.integration_token || !form.values.database_id
            }
          >
            {mode === 'register' ? 'Register' : 'Update'}
          </Button>
          <Flex
            gap={5}
            justify="center"
            align="center"
            c="dark"
            className={classes.select}
          >
            <IconQuestionCircle size={16} />
            <Anchor
              href="https://developers.notion.com/docs/create-a-notion-integration"
              target="_blank"
              rel="noopener noreferrer"
              color="dark"
              className={classes.select}
            >
              What is Integration Token, Database ID
            </Anchor>
          </Flex>
        </Stack>
      </form>
    </div>
  )
}
