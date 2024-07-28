import { QueryClient } from '@tanstack/react-query'
import { Api as ChatApi } from '~/api/servicepro-chat.generated'
import { Api as MainApi, ApiConfig } from '~/api/servicepro.generated'

const timeout = 10000

const settings: ApiConfig = {
  baseURL: 'https://servicepro-api.humanagro.ru/',
  timeout,
}

export const publicClient = new MainApi(settings)

export const privateClient = new MainApi({
  ...settings,
  withCredentials: true,
  paramsSerializer: {
    indexes: null,
  },
})

export const chatClient = new ChatApi({
  baseURL: 'https://servicepro-chat.humanagro.ru/',
  timeout,
})

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
