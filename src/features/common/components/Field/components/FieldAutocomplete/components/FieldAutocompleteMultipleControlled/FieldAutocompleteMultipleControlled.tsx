import { Controller, FieldValues } from 'react-hook-form'
import { FieldAutocompleteMultiple, FieldAutocompleteMultipleProps } from '@components/Field'
import {
  FieldAutocompleteCommonValue,
  FieldAutocompleteControlledCommonProps, FieldAutocompleteControlledOmitProps,
} from '@components/Field/components/FieldAutocomplete/types'

interface FieldAutocompleteMultipleControlledProps<
  T extends FieldAutocompleteCommonValue,
  F extends FieldValues
> extends
  FieldAutocompleteControlledCommonProps<F>,
  FieldAutocompleteControlledOmitProps<FieldAutocompleteMultipleProps<T>> {}

export const FieldAutocompleteMultipleControlled = <T extends FieldAutocompleteCommonValue, F extends FieldValues>(props: FieldAutocompleteMultipleControlledProps<T, F>) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      render={({ fieldState: { error }, field: { name, value, ref, onChange } }) => (
        <FieldAutocompleteMultiple
          {...props}
          ref={ref}
          name={name}
          value={value}
          error={!!error}
          required={props.rules?.required === true}
          onChange={(...args) => {
            onChange(...args)
            props.onAfterChange?.()
          }}
        />
      )}
    />
  )
}
