import React from 'react'
import { Control, Controller, ControllerProps, FieldValues, Path } from 'react-hook-form'
import { FieldDatepicker, FieldDatepickerProps } from 'components/Field/components/FieldDatepicker'

interface FieldDatepickerControlledProps<F extends FieldValues> extends Omit<
  FieldDatepickerProps, 'id' | 'name' | 'value' | 'error' | 'required' | 'onChange'
> {
  name: Path<F>
  control: Control<F>
  rules: ControllerProps['rules']
}

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
