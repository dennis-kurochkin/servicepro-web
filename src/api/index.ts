import { QueryClient } from '@tanstack/react-query'
import { Api, ApiConfig } from '~/api/servicepro.generated'

const settings: ApiConfig = {
  baseURL: 'https://servicepro-api.humanagro.ru/',
  timeout: 3000,
}

export const publicClient = new Api(settings)

export const privateClient = new Api({
  ...settings,
  withCredentials: true,
})

export const queryClient = new QueryClient()
