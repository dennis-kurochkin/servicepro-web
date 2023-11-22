import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

export const LayoutHeader = () => {
  return (
    <>
      <Box
        sx={{
          paddingTop: '60px',
        }}
      >
        <Outlet />
      </Box>
    </>
  )
}
