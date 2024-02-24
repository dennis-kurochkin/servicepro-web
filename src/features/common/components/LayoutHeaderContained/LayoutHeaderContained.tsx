import { Outlet } from 'react-router-dom'
import { headerHeight } from '@components/Header'
import { Container } from '@mui/material'

export const LayoutHeaderContained = () => {
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingTop: `${headerHeight + 24}px`,
          flexGrow: 1,
        }}
        maxWidth="xl"
      >
        <Outlet />
      </Container>
    </>
  )
}
