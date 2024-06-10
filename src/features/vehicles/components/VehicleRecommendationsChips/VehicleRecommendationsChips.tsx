import { Box, Chip, SxProps } from '@mui/material'

interface VehicleRecommendationsChipsProps {
  count: {
    critical: number,
    info: number,
    warning: number,
  }
  sx?: SxProps
}

export const VehicleRecommendationsChips = ({ count, sx }: VehicleRecommendationsChipsProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(36px, max-content))',
        gap: '4px',
        ...(sx ?? {}),
      }}
    >
      <Chip
        size={'medium'}
        label={count.critical}
        color="primary"
        sx={{
          '& > [class*=label]': {
            paddingX: '4px',
          },
        }}
      />
      <Chip
        size={'medium'}
        label={count.warning}
        color="warning"
        sx={{
          '& > [class*=label]': {
            paddingX: '4px',
          },
        }}
      />
      <Chip
        size={'medium'}
        label={count.info}
        color="info"
        sx={{
          '& > [class*=label]': {
            paddingX: '4px',
          },
        }}
      />
    </Box>
  )
}
