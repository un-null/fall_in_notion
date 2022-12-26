import { FC, FormEvent } from 'react'

import Link from 'next/link'

import { Box, Button, Flex, Stack, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconQuestionCircle } from '@tabler/icons'
import { useSession } from 'next-auth/react'

import { useMutateDatabaseInfo } from '../libs/notion'
import { NotionDatabase } from '../types'

// Fix name ↓
type FormValue = NotionDatabase

export const NotionForm: FC = () => {
  const { data: session } = useSession()
  const { registerDatabaseInfo, updateDatabaseInfo } = useMutateDatabaseInfo()

  const form = useForm<FormValue>({
    initialValues: {
      integration_token: '',
      database_id: '',
    },
  })

  const handleSubmit = async (
    values: FormValue,
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    try {
      await updateDatabaseInfo.mutate({
        integration_token: values.integration_token,
        database_id: values.integration_token,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box my={40}>
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

          <Button type="submit" mt={20}>
            Register
          </Button>
          <Link href="/" style={{ textDecoration: 'none' }}>
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
              <Text>What is Integration Token, Database ID</Text>
            </Flex>
          </Link>
        </Stack>
      </form>
    </Box>
  )
}
