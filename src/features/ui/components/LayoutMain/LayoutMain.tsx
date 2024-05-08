import { Outlet, useParams } from 'react-router-dom'
import { FooterCopyright } from '@components/FooterCopyright'
import { Header } from '@components/Header'
import { TicketDrawer } from '@features/tickets/components/TicketDrwer'

export const LayoutMain = () => {
  const params = useParams()

  return (
    <>
      <Header />
      <Outlet />
      {!params.ticketId && <FooterCopyright />}
      <TicketDrawer />
    </>
  )
}
