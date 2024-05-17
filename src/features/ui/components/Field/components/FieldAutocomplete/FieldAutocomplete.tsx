import { forwardRef, Ref, useState } from 'react'
import { FieldLabel, FieldMessage } from '@components/Field'
import {
  FieldAutocompleteOption,
} from '@components/Field/components/FieldAutocomplete/components/FieldAutocompleteOption'
import { FieldAutocompleteSx } from '@components/Field/components/FieldAutocomplete/data'
import { FieldAutocompleteInputProps } from '@components/Field/components/FieldAutocomplete/data/inputProps'
import {
  FieldAutocompleteCommonProps,
  FieldAutocompleteCommonValue,
} from '@components/Field/components/FieldAutocomplete/types'
import { getSxTextFieldDefault } from '@components/Field/data'
import { Autocomplete, TextField } from '@mui/material'

export interface FieldAutocompleteProps<T extends FieldAutocompleteCommonValue> extends FieldAutocompleteCommonProps<T> {
  value: T | null
  onChange: (value: T | null) => void
}

export const FieldAutocomplete = forwardRef(<T extends FieldAutocompleteCommonValue, >({
  name,
  value,
  options,
  label,
  error = false,
  errorMessage,
  sx,
  fluid = false,
  warningMessage,
  disabled = false,
  required = false,
  labelInside = false,
  placeholder,
  disableClearable = false,
  filterOptions = false,
  isLoading = false,
  onChange,
  onInputChange,
}: FieldAutocompleteProps<T>, ref: Ref<HTMLInputElement>) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    if (!disabled) {
      setOpen(true)
    }
  }

  return (
    <Autocomplete
      id={name}
      open={open}
      value={value}
      isOptionEqualToValue={(option, value) => option.id ? option.id === value.id : option.name === value.name}
      getOptionLabel={(option) => option.name}
      noOptionsText={'По вашему запросу ничего не найдено'}
      closeText={'Закрыть'}
      loadingText={'Загрука...'}
      options={options}
      loading={isLoading}
      disableClearable={disableClearable}
      disabled={disabled}
      multiple={false}
      filterOptions={filterOptions ? undefined : (options) => options}
      sx={FieldAutocompleteSx(sx, fluid)}
      renderOption={(HTMLLIElementProps, option) => (
        <FieldAutocompleteOption
          key={option.id + option.name}
          HTMLLIElementProps={HTMLLIElementProps}
          option={option}
        />
      )}
      renderInput={(params) => (
        <>
          {label && !labelInside && (
            <FieldLabel
              htmlFor={name}
              label={label}
              required={required}
              onClick={handleOpen}
            />
          )}
          <TextField
            {...params}
            size={'small'}
            placeholder={placeholder ?? 'Выбрать...'}
            error={error}
            label={labelInside ? label : undefined}
            inputRef={ref}
            InputProps={FieldAutocompleteInputProps(params, isLoading)}
            disabled={disabled}
            sx={getSxTextFieldDefault(disabled)}
            onClick={handleOpen}
          />
          <FieldMessage
            show={!!warningMessage}
            variant={'warning'}
            message={warningMessage}
          />
          <FieldMessage
            show={error}
            message={errorMessage ?? 'Ошибкац'}
          />
        </>
      )}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onChange={(_, value) => onChange(value)}
      onInputChange={(_, value) => onInputChange?.(value)}
    />
  )
})
