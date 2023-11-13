import { theme } from '@data/theme'
import { Agriculture, BusinessCenter, DateRange, Engineering, LocationOn } from '@mui/icons-material'
import { Box, Button, Card, Chip, Typography } from '@mui/material'

export const TicketCard = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        padding: '16px 20px',
        flexShrink: 0,
      }}
    >
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <Typography
          fontWeight={'700'}
          color={theme.palette.grey['800']}
        >
          Заявка ID-1452
        </Typography>
        <Chip
          size={'small'}
          label="Выполнена"
          color="success"
          variant="filled"
        />
      </Box>
      <Box
        sx={{
          display: 'grid',
          gap: '6px',
          marginTop: '12px',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            alignItems: 'start',
            gridTemplateColumns: '32px 30% 1fr',
          }}
        >
          <BusinessCenter fontSize={'small'}
            sx={{ color: theme.palette.primary.light }}
          />
          <Typography
            color={theme.palette.grey['800']}
            variant={'body2'}
          >
            Клиент
          </Typography>
          <Typography variant={'body2'}>
            Агротехник
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            alignItems: 'start',
            gridTemplateColumns: '32px 30% 1fr',
          }}
        >
          <LocationOn fontSize={'small'}
            sx={{ color: theme.palette.primary.light }}
          />
          <Typography
            color={theme.palette.grey['800']}
            variant={'body2'}
          >
            Адрес
          </Typography>
          <Typography variant={'body2'}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            alignItems: 'start',
            gridTemplateColumns: '32px 30% 1fr',
          }}
        >
          <Agriculture fontSize={'small'}
            sx={{ color: theme.palette.primary.light }}
          />
          <Typography
            variant={'body2'}
            color={theme.palette.grey['800']}
          >
            Техника
          </Typography>
          <Typography variant={'body2'}>
            John Deere 9630
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            alignItems: 'start',
            gridTemplateColumns: '32px 30% 1fr',
          }}
        >
          <DateRange fontSize={'small'}
            sx={{ color: theme.palette.primary.light }}
          />
          <Typography
            color={theme.palette.grey['800']}
            variant={'body2'}
          >
            Время (с/а)
          </Typography>
          <Typography variant={'body2'}>
            13.11.2023 15:30 / 15.11.2023 16:00
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            alignItems: 'start',
            gridTemplateColumns: '32px 30% 1fr',
          }}
        >
          <Engineering fontSize={'small'}
            sx={{ color: theme.palette.primary.light }}
          />
          <Typography
            color={theme.palette.grey['800']}
            variant={'body2'}
          >
            Инженер
          </Typography>
          <Typography variant={'body2'}>
            Петров И.А.{' '}
            <Typography
              component={'span'}
              variant={'body2'}
              fontWeight={700}
              color={theme.palette.success.main}
            >
              (4.3)
            </Typography>
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '4px',
          marginTop: '20px',
        }}
      >
        <Button
          size={'small'}
          variant={'contained'}
          disableElevation
        >
          Назначить инженера
        </Button>
        <Button
          size={'small'}
          variant={'outlined'}
          disableElevation
        >
          Вернуть в работу
        </Button>
      </Box>
    </Card>
  )
}
