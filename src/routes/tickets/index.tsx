import { Map } from '@components/Map'
import { Box } from '@mui/material'

export const TicketsRoute = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '500px 1fr',
        height: 'calc(100vh - 60px)',
        paddingX: '24px',
      }}
    >
      <Box
        sx={{
          paddingTop: '24px',
          paddingBottom: '36px',
        }}
      >

      </Box>
      <Map
        height={'100%'}
        minHeight={'100%'}
        sx={{
          marginRight: '-24px',
        }}
      />
    </Box>
  )
}
