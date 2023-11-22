import { Outlet } from 'react-router-dom'
import { Header } from '@features/common/components/Header'
import { Box, Typography } from '@mui/material'

export const LayoutMain = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Box
        sx={{
          padding: '56px 0 24px',
        }}
      >
        <Typography
          component={'div'}
          variant={'overline'}
          align={'center'}
          fontWeight={400}
          color={theme => theme.palette.grey['600']}
        >
          СЕРВИСПРО 2024
        </Typography>
      </Box>
    </>
  )
}
