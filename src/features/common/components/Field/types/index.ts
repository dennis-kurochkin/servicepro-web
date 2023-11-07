import {FieldLabelProps, FieldMessageProps} from "~/features/common/components/Field";

export interface FieldCommonProps {
  name: string
  label?: FieldLabelProps['label']
  labelInside?: boolean
  required?: boolean
  fluid?: boolean
  error?: FieldMessageProps['show']
  errorMessage?: string
}
