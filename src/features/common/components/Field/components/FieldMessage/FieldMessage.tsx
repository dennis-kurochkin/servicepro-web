import { Typography } from '@mui/material'
import {theme} from "~/features/common/components/ThemeRegistry/ThemeRegistry";

export interface FieldMessageProps {
  show?: boolean
  variant?: 'warning' | 'error'
  message?: string
}

export const FieldMessage = ({ show = false, variant = 'error', message }: FieldMessageProps) => {
  return show ? (
    <Typography
      variant={'caption'}
      sx={{
        marginTop: 1,
        color: variant === 'error' ? theme.palette.error.main : theme.palette.warning.main,
      }}
    >
      {message ?? 'Произошла ошибка'}
    </Typography>
  ) : null
}
