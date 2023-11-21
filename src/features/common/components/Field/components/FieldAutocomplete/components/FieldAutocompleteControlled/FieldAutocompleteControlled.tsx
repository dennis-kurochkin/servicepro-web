import { Controller, FieldValues } from 'react-hook-form'
import { FieldAutocomplete, FieldAutocompleteProps } from '@components/Field'
import {
  FieldAutocompleteCommonValue,
  FieldAutocompleteControlledCommonProps, FieldAutocompleteControlledOmitProps,
} from '@components/Field/components/FieldAutocomplete/types'

interface FieldAutocompleteControlledProps<
  T extends FieldAutocompleteCommonValue,
  F extends FieldValues
> extends
  FieldAutocompleteControlledCommonProps<F>,
  FieldAutocompleteControlledOmitProps<FieldAutocompleteProps<T>> {}

export const FieldAutocompleteControlled = <T extends FieldAutocompleteCommonValue, F extends FieldValues>(props: FieldAutocompleteControlledProps<T, F>) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      render={({ fieldState: { error }, field: { name, value, ref, onChange } }) => (
        <FieldAutocomplete
          {...props}
          ref={ref}
          name={name}
          value={value ?? null}
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
