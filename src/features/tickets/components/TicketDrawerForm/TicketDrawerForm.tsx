import { useState } from 'react'
import { FieldInput } from '@components/Field'
import { Send } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'

interface TicketDrawerFormProps {
  title: string
  bordered?: boolean
}

export const TicketDrawerForm = ({ title, bordered = true }: TicketDrawerFormProps) => {
  const [value, setValue] = useState('')

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
        minRows={3}
        maxRows={6}
        sx={{ marginTop: '12px' }}
        multiline
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        variant={'outlined'}
        size={'small'}
        endIcon={<Send fontSize={'small'} />}
        sx={{ marginTop: '12px' }}
      >
        Отправить
      </Button>
    </Box>
  )
}
