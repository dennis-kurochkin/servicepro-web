import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'
import { FieldDatepicker, FieldDatepickerProps } from '@components/Field/components/FieldDatepicker'

type FieldDatepickerControlledProps<F extends FieldValues = FieldValues> = UseControllerProps<F> & Omit<
  FieldDatepickerProps, 'id' | 'name' | 'value' | 'error' | 'required' | 'onChange'
>

export const FieldDatepickerControlled = <F extends FieldValues>(props: FieldDatepickerControlledProps<F>) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      render={({ fieldState: { error }, field: { name, value, ref, onChange } }) => (
        <FieldDatepicker
          {...props}
          ref={ref}
          name={name}
          value={value}
          error={!!error}
          required={props.rules?.required === true}
          onChange={onChange}
        />
      )}
    />
  )
}
