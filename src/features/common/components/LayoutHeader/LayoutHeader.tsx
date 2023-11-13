import { Outlet } from 'react-router-dom'
import { Header } from '@features/common/components/Header'

export const LayoutHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
