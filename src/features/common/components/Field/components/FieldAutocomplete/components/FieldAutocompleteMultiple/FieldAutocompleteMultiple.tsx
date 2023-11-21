import { forwardRef, Ref, useMemo, useState } from 'react'
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
import { Autocomplete, Box, TextField } from '@mui/material'

export interface FieldAutocompleteMultipleProps<T extends FieldAutocompleteCommonValue> extends FieldAutocompleteCommonProps<T> {
  value: T[]
  count?: boolean
  onChange: (value: T[]) => void
}

export const FieldAutocompleteMultiple = forwardRef(<T extends FieldAutocompleteCommonValue, >({
  name,
  value,
  options,
  label,
  error = false,
  errorMessage,
  max,
  placeholder,
  sx,
  warningMessage,
  disabled = false,
  count = false,
  fluid = false,
  required = false,
  labelInside = false,
  disableClearable = false,
  filterOptions = false,
  isLoading = false,
  onChange,
  onInputChange,
}: FieldAutocompleteMultipleProps<T>, ref: Ref<HTMLInputElement>) => {
  const [open, setOpen] = useState(false)
  const limitReached = useMemo(() => max ? value.length >= max : false, [max, value])

  const handleOpen = () => {
    if (!disabled && !limitReached) {
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
      noOptionsText={'Опций не найдено'}
      closeText={'Закрыть'}
      loadingText={'Загрузка...'}
      options={options}
      loading={isLoading}
      disabled={disabled || limitReached}
      disableClearable={disableClearable}
      filterOptions={filterOptions ? undefined : (options) => options}
      sx={FieldAutocompleteSx(sx, fluid)}
      renderTags={!count || !value.length ? undefined : (value) => (
        <Box sx={{ paddingLeft: '8px' }}>
          {value.length} выбрано
        </Box>
      )}
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
            placeholder={placeholder ?? 'Выберите опции'}
            error={error}
            label={labelInside ? label : undefined}
            inputRef={ref}
            InputProps={FieldAutocompleteInputProps(params, isLoading)}
            disabled={limitReached || disabled}
            sx={getSxTextFieldDefault()}
            onClick={handleOpen}
          />
          <FieldMessage
            show={!!warningMessage ?? limitReached}
            variant={'warning'}
            message={warningMessage ?? `Нельзя выбрать больше (${max})`}
          />
          <FieldMessage
            show={error}
            message={errorMessage ?? 'Ошибка'}
          />
        </>
      )}
      multiple
      onOpen={() => handleOpen()}
      onClose={() => setOpen(false)}
      onChange={(_, value) => onChange(value)}
      onInputChange={(_, value) => onInputChange?.(value)}
    />
  )
})
