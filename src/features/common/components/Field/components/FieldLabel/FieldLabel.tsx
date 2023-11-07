import { InputLabel, InputLabelProps, Typography } from '@mui/material'
import {theme} from "~/features/common/components/ThemeRegistry/ThemeRegistry";

export interface FieldLabelProps {
  htmlFor: InputLabelProps['htmlFor']
  label: string
  required?: boolean
  onClick?: InputLabelProps['onClick']
}

export const FieldLabel = ({ htmlFor, label, required = false, onClick }: FieldLabelProps) => {
  return (
    <InputLabel
      htmlFor={htmlFor}
      onClick={onClick}
    >
      <Typography
        variant={'body2'}
        sx={{
          color: theme.palette.grey['800'],
          marginBottom: 1,
        }}
      >
        {label}
        {required && (
          <Typography
            component={'span'}
            color={theme.palette.error.main}
            marginLeft={'2px'}
          >
            {'*'}
          </Typography>
        )}
      </Typography>
    </InputLabel>
  )
}
