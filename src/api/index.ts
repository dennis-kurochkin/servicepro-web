import { QueryClient } from 'react-query'
import { Api } from '~/api/servicepro.generated'

export const client = new Api({
  baseURL: 'https://servicepro-api.humanagro.ru/',
  timeout: 3000,
})

export const api = client.api

export const queryClient = new QueryClient()
