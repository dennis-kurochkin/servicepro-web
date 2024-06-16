import { QueryClient } from '@tanstack/react-query'
import { Api as ChatApi } from '~/api/servicepro-chat.generated'
import { Api as MainApi, ApiConfig } from '~/api/servicepro.generated'

const settings: ApiConfig = {
  baseURL: 'https://servicepro-api.humanagro.ru/',
  timeout: 3000,
}

export const publicClient = new MainApi(settings)

export const privateClient = new MainApi({
  ...settings,
  withCredentials: true,
})

export const chatClient = new ChatApi({
  baseURL: 'https://servicepro-chat.humanagro.ru/',
  timeout: 3000,
})

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
