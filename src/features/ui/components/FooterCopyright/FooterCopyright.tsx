import { Box, Typography } from '@mui/material'

export const FooterCopyright = () => {
  return (
    <Box
      sx={{
        padding: '56px 0 24px',
        marginTop: 'auto',
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
  )
}
