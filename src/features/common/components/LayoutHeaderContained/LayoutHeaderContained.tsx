import { Outlet } from 'react-router-dom'
import { Header } from '@features/common/components/Header'
import { Container } from '@mui/material'

export const LayoutHeaderContained = () => {
  return (
    <>
      <Header />
      <Container
        sx={{
          paddingTop: '24px',
          paddingBottom: '36px',
        }}
        maxWidth="xl"
      >
        <Outlet />
      </Container>
    </>
  )
}
