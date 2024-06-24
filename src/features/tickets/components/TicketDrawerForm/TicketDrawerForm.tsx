import { ChangeEvent, useState } from 'react'
import { FieldInput } from '@components/Field'
import { Send } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Alert, Box, Typography } from '@mui/material'

interface TicketDrawerFormProps {
  title: string
  value: string
  alert?: string
  disabled?: boolean
  loading: boolean
  bordered?: boolean
  onChange: (value: string) => void
  onSubmit: () => void
}

export const TicketDrawerForm = ({ title, value, alert, disabled = false, bordered = true, loading, onSubmit, onChange }: TicketDrawerFormProps) => {
  const [error, setError] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
    setError(false)
  }

  const handleSubmit = () => {
    if (!value) {
      setError(true)
      return
    }

    onSubmit()
  }

  return (
    <Box
      sx={{
        padding: '16px 16px 12px',
        borderTop: bordered ? '1px solid' : undefined,
        borderColor: (theme) => theme.palette.grey['200'],
      }}
    >
      <Typography
        variant={'h6'}
      >
        {title}
      </Typography>
      <FieldInput
        value={value}
        name={'text'}
        placeholder={'Введите текст'}
        disabled={disabled || loading}
        minRows={3}
        maxRows={6}
        error={error}
        sx={{ marginTop: '12px' }}
        multiline
        onChange={handleChange}
      />
      {alert && (
        <Alert
          severity={'warning'}
          sx={{ marginTop: '12px' }}
        >
          {alert}
        </Alert>
      )}
      <LoadingButton
        variant={'outlined'}
        size={'small'}
        endIcon={<Send fontSize={'small'} />}
        sx={{ marginTop: '12px' }}
        disabled={disabled}
        loading={loading}
        onClick={handleSubmit}
      >
        Отправить
      </LoadingButton>
    </Box>
  )
}
