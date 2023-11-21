import { FieldInput } from '@components/Field'
import { Map } from '@components/Map'
import { TicketCard } from '@features/tickets/components/TicketCard'
import { Search } from '@mui/icons-material'
import { Box, InputAdornment, Typography } from '@mui/material'

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
          position: 'relative',
          zIndex: 900,
          height: '100%',
          overflow: 'hidden',
          paddingTop: '24px',
          paddingBottom: '36px',
          paddingRight: '28px',
          boxShadow: '10px 0px 6px -8px rgba(0,0,0,.1)',
        }}
      >
        <Typography
          variant={'h5'}
        >
          Заявки
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '16px',
          }}
        >
          <FieldInput
            value={''}
            name={'search'}
            placeholder={'Поиск по названию'}
            sx={{ width: '260px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginRight: '-28px',
            paddingRight: '20px',
            gap: '6px',
            marginTop: '24px',
            overflowY: 'auto',
            height: '90%',
          }}
        >
          <TicketCard />
          <TicketCard />
          <TicketCard />
          <TicketCard />
          <TicketCard />
          <TicketCard />
          <TicketCard />
          <TicketCard />
          <TicketCard />
        </Box>
      </Box>
      <Map
        sx={{
          height: '100%',
          marginRight: '-24px',
        }}
      />
    </Box>
  )
}
