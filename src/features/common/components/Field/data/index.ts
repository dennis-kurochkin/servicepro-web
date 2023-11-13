import { theme } from '@data/theme'
import { SxProps } from '@mui/material'

export const getSxOutlinedInputDefault = (): SxProps => ({
  '&.MuiOutlinedInput-root:hover': {
    '& > fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
})

export const getSxTextFieldDefault = (disabled?: boolean): SxProps => disabled ? {} : {
  '& .MuiOutlinedInput-root': {
    background: theme.palette.common.white,
    '& > fieldset': {
      borderColor: theme.palette.grey['300'],
    },
  },
  '& .MuiOutlinedInput-root:hover': {
    '& > fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}
