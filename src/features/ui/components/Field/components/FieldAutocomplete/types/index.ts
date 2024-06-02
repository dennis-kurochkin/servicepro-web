import { Control, ControllerProps, FieldValues, Path } from 'react-hook-form'
import { FieldCommonProps } from '@components/Field/types'
import { SxProps } from '@mui/material'

export interface FieldAutocompleteCommonValue {
  value: string
  label: string
}

export interface FieldAutocompleteCommonProps<T extends FieldAutocompleteCommonValue> extends FieldCommonProps {
  options: T[]
  sx?: SxProps
  max?: number
  disabled?: boolean
  placeholder?: string
  warningMessage?: string
  disableClearable?: boolean
  filterOptions?: boolean
  isLoading?: boolean
  onInputChange?: (value: string) => void
}

export type FieldAutocompleteControlledOmitProps<T> = Omit<T, 'id' | 'name' | 'value' | 'error' | 'required' | 'onChange'>

export interface FieldAutocompleteControlledCommonProps<F extends FieldValues> {
  name: Path<F>
  control: Control<FieldValues, F>
  rules: ControllerProps['rules']
  onAfterChange?: () => void
}
