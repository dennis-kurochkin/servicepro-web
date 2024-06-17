import { useSearchParams } from 'react-router-dom'
import { SearchParamsKey } from '@features/shared/data'

export const useOpenTicketDrawer = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  return {
    openTicketDrawer: (ticketID: number) => {
      searchParams.set(SearchParamsKey.TicketID, ticketID.toString())
      setSearchParams(searchParams)
    },
  }
}
