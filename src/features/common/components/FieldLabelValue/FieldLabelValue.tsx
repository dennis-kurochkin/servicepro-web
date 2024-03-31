import { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'

interface FieldLabelValueProps {
  label: ReactNode | string
  value: ReactNode | string
}

export const FieldLabelValue = ({ label, value }: FieldLabelValueProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '16px',
      }}
    >
      <Typography
        variant={'body1'}
        sx={{ color: (theme) => theme.palette.grey['700'] }}
      >
        {label}:
      </Typography>
      <Typography
        variant={'body1'}
      >
        {value}
      </Typography>
    </Box>
  )
}
