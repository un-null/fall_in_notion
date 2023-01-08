import { FC, useState } from 'react'

import {
  ActionIcon,
  Avatar,
  Card,
  Center,
  Collapse,
  createStyles,
  Flex,
  Group,
  Stack,
  Text,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import {
  IconBrandNotion,
  IconBrandTwitter,
  IconChevronRight,
} from '@tabler/icons'
import { useSession } from 'next-auth/react'

import { NotionForm } from './NotionForm'

type Props = {
  name?: string | null
  email?: string | null
  image?: string | null
}

const useStyles = createStyles(() => ({
  icon: {
    '&:hover': {
      color: '#1DA1F2',
    },
  },
}))

export const UserCard: FC<Partial<Props>> = ({ name, email, image }) => {
  const { classes } = useStyles()
  const [opened, setOpened] = useState(false)
  const { data: session } = useSession()

  const media = useMediaQuery('(max-width: 430px)')

  return (
    <Card shadow="sm" maw={610} w="100%">
      <Flex justify="space-between" align="strech">
        <Stack justify="space-between">
          {/* Fix Action Icon ? ↓ */}
          <Group spacing="xs">
            <ActionIcon
              size={media ? 'lg' : 'xl'}
              color="cyan"
              variant="filled"
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitter.com/${name}`}
            >
              <IconBrandTwitter size={media ? 20 : 24} />
            </ActionIcon>
            <ActionIcon
              size={media ? 'lg' : 'xl'}
              color="dark"
              variant="outline"
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.notion.so/${session?.user.database_id}`}
            >
              <IconBrandNotion size={media ? 24 : 28} />
            </ActionIcon>
          </Group>

          <Text size={media ? 'lg' : 'xl'} weight="bold" color="dark">
            @{name}
          </Text>
        </Stack>
        <Avatar src={image} w={media ? 100 : 125} h={media ? 100 : 125} />
      </Flex>

      <Text size={media ? 'xs' : 'sm'} color="dimmed" pb={8}>
        {email}
      </Text>

      <Card.Section bg="gray.1" py={8}>
        <Flex pl={12} pr={16} justify="space-between">
          <Group spacing={0}>
            <IconBrandNotion color="#2C2E33" />
            <Text size="xs" weight="bold" color="dark.5">
              DataTable
            </Text>
          </Group>
          <Group
            spacing="xs"
            sx={{ cursor: 'pointer', ':hover': { color: '#1DA1F2' } }}
          >
            <Text
              size={media ? 'xs' : 'sm'}
              weight="bold"
              onClick={() => setOpened((o) => !o)}
            >
              {opened ? 'Close' : 'Confirm'}
            </Text>
            <IconChevronRight size={16} className={classes.icon} />
          </Group>
        </Flex>

        <Collapse in={opened}>
          <Center my={20}>
            <NotionForm mode="edit" />
          </Center>
        </Collapse>
      </Card.Section>
    </Card>
  )
}
