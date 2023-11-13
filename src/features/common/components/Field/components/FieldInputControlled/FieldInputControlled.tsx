import { Control, Controller, ControllerProps, FieldValues, Path } from 'react-hook-form'
import { FieldInput, FieldInputProps } from '~/features/common/components/Field'

interface FieldInputControlledProps<F extends FieldValues> extends Omit<
  FieldInputProps, 'value' | 'error' | 'required' | 'onChange' | 'onBlur'
> {
  name: Path<F>
  control: Control<FieldValues, F>
  rules: ControllerProps['rules']
}

export const FieldInputControlled = <F extends FieldValues>(props: FieldInputControlledProps<F>) => {
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
