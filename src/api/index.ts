import { QueryClient } from 'react-query'
import { Api } from '~/api/servicepro.generated'

// export const client = axios.create({
//   baseURL: 'https://servicepro-api.humanagro.ru/api/',
//   timeout: 3000,
// })

export const client = new Api({
  baseURL: 'https://servicepro-api.humanagro.ru/',
}).api

export const queryClient = new QueryClient()
