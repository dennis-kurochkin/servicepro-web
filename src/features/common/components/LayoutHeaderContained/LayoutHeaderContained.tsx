import { Outlet } from 'react-router-dom'
import { headerHeight } from '@components/Header'
import { Box } from '@mui/material'

export const LayoutHeaderContained = () => {
  return (
    <>
      <Box
        sx={{
          paddingTop: `${headerHeight + 24}px`,
          paddingX: '20px',
        }}
      >
        <Outlet />
      </Box>
    </>
  )
}
