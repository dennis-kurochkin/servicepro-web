import { ReactElement } from 'react'
import { Box, InputBaseProps } from '@mui/material'
import { FieldLabel } from './components/FieldLabel'
import { FieldMessage } from './components/FieldMessage'

type RenderInputProps = Pick<InputBaseProps, 'required' | 'id'> & {
  id: string
  error: boolean
}

export interface FieldProps extends InputBaseProps {
  id: string
  label: string
  error?: boolean
  errorMessage?: string
  renderInput: (props: RenderInputProps) => ReactElement
}

export const Field = ({
  id,
  label,
  required = false,
  error = false,
  errorMessage,
  renderInput,
}: FieldProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <FieldLabel
        htmlFor={id}
        label={label}
        required={required}
      />
      {renderInput({ required, id, error })}
      <FieldMessage
        show={error}
        message={errorMessage}
      />
    </Box>
  )
}
