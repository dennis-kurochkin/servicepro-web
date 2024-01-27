import { useNavigate } from 'react-router-dom'
import keanu from '@assets/keanu-reeves.webp'
import { Box, Button, Typography } from '@mui/material'

export const NotFoundRoute = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        height: '100vh',
        width: '700px',
        margin: '0 auto',
      }}
    >
      <Typography
        variant={'h2'}
        sx={{
          fontWeight: '500',
          marginBottom: '24px',
        }}
      >
        Такой страницы<br />
        не существует
      </Typography>
      <img
        src={keanu}
        alt="404"
        style={{ display: 'block' }}
        width={400}
        height={320}
      />
      <Button
        variant={'outlined'}
        sx={{
          marginTop: '32px',
        }}
        onClick={() => navigate('/tickets')}
      >
        На главную
      </Button>
    </Box>
  )
}
