import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'

export const LayoutHeaderContained = () => {
  return (
    <>
      <Container
        sx={{
          paddingTop: '84px',
        }}
        maxWidth="xl"
      >
        <Outlet />
      </Container>
    </>
  )
}
