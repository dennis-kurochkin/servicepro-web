import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'

export const LayoutAuth = () => {
  return (
    <Container
      maxWidth="xl"
    >
      <Outlet />
    </Container>
  )
}
