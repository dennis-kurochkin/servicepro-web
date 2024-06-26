import { forwardRef, ReactNode, Ref } from 'react'
import { FieldLabel, FieldMessage } from '@features/ui/components/Field'
import { INPUT_MAX_WIDTH } from '@features/ui/components/Field/constants'
import { getSxTextFieldDefault } from '@features/ui/components/Field/data'
import { FieldCommonProps } from '@features/ui/components/Field/types'
import { Box, SxProps, TextField, TextFieldProps } from '@mui/material'

type PickedOutlinedInputProps = Pick<TextFieldProps, 'placeholder' | 'type' | 'autoFocus' | 'multiline' | 'disabled' | 'minRows' | 'maxRows' | 'autoComplete' | 'InputProps' | 'onChange' | 'onBlur'>

export interface FieldInputProps extends PickedOutlinedInputProps, FieldCommonProps {
  value: string
  sx?: SxProps
  readOnly?: boolean
  renderRight?: ReactNode
  InputContainerProps?: {
    sx?: SxProps
  }
}

export const FieldInput = forwardRef(({
  name,
  value,
  label,
  placeholder,
  sx = {},
  type = 'text',
  labelInside = false,
  required = false,
  autoFocus,
  error,
  disabled,
  fluid = false,
  readOnly,
  renderRight,
  multiline,
  maxRows,
  minRows,
  autoComplete,
  InputProps,
  InputContainerProps,
  onChange,
  onBlur,
}: FieldInputProps, ref: Ref<HTMLInputElement>) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: !fluid ? INPUT_MAX_WIDTH : undefined,
        ...sx,
      }}
    >
      {label && !labelInside && (
        <FieldLabel
          htmlFor={name}
          label={label}
          required={required}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          gap: '8px',
          ...(InputContainerProps?.sx ?? {}),
        }}
      >
        <TextField
          inputRef={ref}
          id={name}
          value={value}
          label={labelInside ? label : undefined}
          error={error}
          placeholder={placeholder}
          type={type}
          required={required}
          autoFocus={autoFocus}
          disabled={disabled}
          multiline={multiline}
          minRows={minRows}
          maxRows={maxRows}
          autoComplete={autoComplete}
          size={'small'}
          sx={{
            ...getSxTextFieldDefault(),
            flexGrow: 1,
          }}
          InputProps={{
            readOnly,
            ...(InputProps ?? {}),
          }}
          onChange={onChange}
          onBlur={onBlur}
        />
        {renderRight}
      </Box>
      <FieldMessage show={error} />
    </Box>
  )
})

FieldInput.displayName = 'FieldInput'
