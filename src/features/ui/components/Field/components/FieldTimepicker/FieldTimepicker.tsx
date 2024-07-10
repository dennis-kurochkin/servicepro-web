import { forwardRef, Ref, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FieldCommonProps } from '@components/Field/types'
import { TextFieldProps } from '@mui/material'
import { LocalizationProvider, TimePicker, TimePickerProps } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ruRU } from '@mui/x-date-pickers/locales'
import { addHours, isAfter, isToday, setHours, setMinutes } from 'date-fns'
import { languages } from '~/i18n'

const getMinTime = (date: Date) => setMinutes(setHours(date, 8), 0)

const minTime = getMinTime(new Date())

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

  const minTimeComputed = useMemo(() => {
    const today = isToday(value as Date)

    if (!today || !isAfter(setHours(value as Date, 8), getMinTime(value as Date))) {
      return minTime
    }

    return addHours(value as Date, 4)
  }, [value])

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={languages.find(({ id }) => id === i18n.language)?.dateFnsLocale}
      localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <TimePicker
        inputRef={ref}
        value={value}
        minTime={minTimeComputed}
        disableFuture={disableFuture}
        disablePast={disablePast}
        label={label}
        minutesStep={5}
        slotProps={{
          textField: {
            size: 'small',
          },
          desktopPaper: {
            sx: {
              '& .MuiMenuItem-root[class*="disabled"]': {
                display: 'none',
              },

            },
          },
        }}
        onChange={onChange}
      />
    </LocalizationProvider>
  )
})
