import { FieldLabelProps } from 'components/Field/components/FieldLabel'
import { FieldMessageProps } from 'components/Field/components/FieldMessage'

export interface FieldCommonProps {
  name: string
  label?: FieldLabelProps['label']
  labelInside?: boolean
  required?: boolean
  fluid?: boolean
  error?: FieldMessageProps['show']
  errorMessage?: string
}
