import { Outlet, useParams } from 'react-router-dom'
import { FooterCopyright } from '@components/FooterCopyright'
import { Header } from '@components/Header'

export const LayoutMain = () => {
  const params = useParams()

  return (
    <>
      <Header />
      <Outlet />
      {!params.ticketId && <FooterCopyright />}
    </>
  )
}
