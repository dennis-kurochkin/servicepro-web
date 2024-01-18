import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'
import { FieldInput, FieldInputProps } from '~/features/common/components/Field'

// interface FieldInputControlledProps<F extends FieldValues = FieldValues> extends UseControllerProps<F> {}

type FieldInputControlledProps<F extends FieldValues = FieldValues> = UseControllerProps<F> & Omit<
  FieldInputProps, 'value' | 'error' | 'required' | 'onChange' | 'onBlur'
>

// interface FieldInputControlledProps<F extends FieldValues = FieldValues> extends Omit<
//   FieldInputProps, 'value' | 'error' | 'required' | 'onChange' | 'onBlur'
// > {
//   name: Path<F>
//   control: Control<F>
//   rules: ControllerProps['rules']
// }

export const FieldInputControlled = <F extends FieldValues = FieldValues>(props: FieldInputControlledProps<F>) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      render={({ fieldState: { error }, field: { name, value, ref, onChange, onBlur } }) => (
        <FieldInput
          {...props}
          ref={ref}
          name={name}
          value={value}
          error={!!error}
          required={props.rules?.required === true}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
    />
  )
}
