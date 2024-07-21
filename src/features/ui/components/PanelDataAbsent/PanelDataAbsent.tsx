import { Card, Typography } from '@mui/material'

export const PanelDataAbsent = () => {
  return (
    <Card
      variant={'outlined'}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100px',
        borderRadius: 2,
        background: (theme) => theme.palette.grey['200'],
      }}
    >
      <Typography
        variant={'subtitle1'}
        sx={{ color: (theme) => theme.palette.grey['600'] }}
      >
        Данные отсутствуют
      </Typography>
    </Card>
  )
}
