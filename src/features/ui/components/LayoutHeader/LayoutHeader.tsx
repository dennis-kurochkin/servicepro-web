import { Outlet } from 'react-router-dom'
import { headerHeight } from '@components/Header'
import { Box } from '@mui/material'

export const LayoutHeader = () => {
  return (
    <>
      <Box
        sx={{
          paddingTop: `${headerHeight}px`,
        }}
      >
        <Outlet />
      </Box>
    </>
  )
}
