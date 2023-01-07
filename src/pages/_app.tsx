import type { AppProps } from 'next/app'

import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colors: {
              red: [
                '#F2E6E6',
                '#E7C6C6',
                '#E1A4A4',
                '#E28080',
                // 4
                '#EB5757',
                '#D64C4C',
                '#C14444',
                '#A54646',
                '#8C4848',
                '#784747',
              ],
              pink: [
                '#F6F0F2',
                '#E7D2DC',
                '#DEB3C7',
                '#DA93B4',
                '#DC70A1',
                '#E64890',
                // 6
                '#F91980',
                '#D91E74',
                '#B22C6A',
                '#943360',
              ],
              cyan: [
                '#EDF1F4',
                '#CFDDE5',
                '#B2CBDB',
                '#92BDD6',
                '#70B0D8',
                '#4AA7E1',
                // 6
                '#1DA1F2',
                '#238FD1',
                '#2F7DAC',
                '#366E90',
              ],
            },
            components: {
              TextInput: {
                styles: (theme) => ({
                  input: {
                    ':focus': {
                      borderColor: theme.colors.cyan[6],
                    },
                  },
                  error: {
                    color: theme.colors.red[4],
                  },
                  required: {
                    color: theme.colors.red[4],
                  },
                  invalid: {
                    color: theme.colors.red[4],
                    borderColor: theme.colors.red[4],
                  },
                }),
              },
              NumberInput: {
                styles: (theme) => ({
                  input: {
                    ':focus': {
                      borderColor: theme.colors.cyan[6],
                    },
                  },
                  error: {
                    color: theme.colors.red[4],
                  },
                  required: {
                    color: theme.colors.red[4],
                  },
                  invalid: {
                    color: theme.colors.red[4],
                    borderColor: theme.colors.red[4],
                  },
                }),
              },
            },
          }}
        >
          <NotificationsProvider>
            <Component {...pageProps} />
          </NotificationsProvider>
        </MantineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default App
