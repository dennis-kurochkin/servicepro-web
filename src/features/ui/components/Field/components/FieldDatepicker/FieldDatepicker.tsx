import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FieldCommonProps } from '@components/Field/types'
import { TextFieldProps } from '@mui/material'
import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { languages } from '~/i18n'

export interface FieldDatepickerProps extends
  FieldCommonProps,
  Pick<DatePickerProps<Date>, 'value' | 'disableFuture' | 'disablePast' | 'maxDate' | 'onChange'>
{
  onBlur?: TextFieldProps['onBlur']
}

export const FieldDatepicker = forwardRef(({
  value,
  label,
  disableFuture,
  disablePast,
  maxDate,
  onChange,
}: FieldDatepickerProps) => {
  const { i18n } = useTranslation()

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={languages.find(({ id }) => id === i18n.language)?.dateFnsLocale}
    >
      <DatePicker
        value={value}
        disableFuture={disableFuture}
        disablePast={disablePast}
        maxDate={maxDate}
        label={label}
        slotProps={{
          textField: {
            size: 'small',
          },
        }}
        onChange={onChange}
      />
    </LocalizationProvider>
  )
})
