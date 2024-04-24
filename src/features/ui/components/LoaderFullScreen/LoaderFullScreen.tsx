import { Box, CircularProgress } from '@mui/material'

export const LoaderFullScreen = () => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh',
    }}
    >
      <CircularProgress color={'secondary'} />
    </Box>
  )
}
