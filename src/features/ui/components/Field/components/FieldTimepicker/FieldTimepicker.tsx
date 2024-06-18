import { forwardRef, Ref } from 'react'
import { useTranslation } from 'react-i18next'
import { FieldCommonProps } from '@components/Field/types'
import { TextFieldProps } from '@mui/material'
import { LocalizationProvider, TimePicker, TimePickerProps } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ruRU } from '@mui/x-date-pickers/locales'
import { languages } from '~/i18n'

export interface FieldDatepickerProps extends
  FieldCommonProps,
  Pick<TimePickerProps<Date>, 'value' | 'disableFuture' | 'disablePast' | 'onChange'>
{
  onBlur?: TextFieldProps['onBlur']
}

export const FieldTimepicker = forwardRef(({
  value,
  label,
  disableFuture,
  disablePast,
  onChange,
}: FieldDatepickerProps, ref: Ref<HTMLInputElement>) => {
  const { i18n } = useTranslation()

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={languages.find(({ id }) => id === i18n.language)?.dateFnsLocale}
      localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}

    >
      <TimePicker
        inputRef={ref}
        value={value}
        disableFuture={disableFuture}
        disablePast={disablePast}
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
