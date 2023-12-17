import { Outlet } from 'react-router-dom'
import { headerHeight } from '@components/Header'
import { Container } from '@mui/material'

export const LayoutHeaderContained = () => {
  return (
    <>
      <Container
        sx={{
          paddingTop: `${headerHeight + 24}px`,
        }}
        maxWidth="xl"
      >
        <Outlet />
      </Container>
    </>
  )
}
