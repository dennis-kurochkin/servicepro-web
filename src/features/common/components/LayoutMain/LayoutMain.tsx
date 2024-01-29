import { Outlet } from 'react-router-dom'
import { FooterCopyright } from '@components/FooterCopyright'
import { Header } from '@components/Header'

export const LayoutMain = () => {
  return (
    <>
      <Header />
      <Outlet />
      <FooterCopyright />
    </>
  )
}
