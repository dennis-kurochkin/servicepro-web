import { useLayoutEffect, useRef } from 'react'
import { FieldInput } from '@components/Field'
import { theme } from '@data/theme'
import { TicketChatMessage } from '@features/tickets/components/TicketChatMessage'
import { Close, Send } from '@mui/icons-material'
import { Box, Button, IconButton, Typography } from '@mui/material'

interface TicketInteractionChatProps {
  onClose: () => void
}

export const TicketInteractionChat = ({ onClose }: TicketInteractionChatProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (containerRef?.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [containerRef?.current?.scrollHeight])

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'grid',
        gridTemplateRows: 'min-content 1fr max-content',
        padding: '0',
        width: '60vw',
        maxWidth: '900px',
        minWidth: '450px',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid',
          borderColor: (theme) => theme.palette.grey['300'],
        }}
      >
        <Typography
          variant={'h5'}
          fontWeight={500}
        >
          Заявка "Путиловец" ООО
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
        >
          <Close />
        </IconButton>
      </Box>
      <Box
        ref={containerRef}
        id={'container'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '6px',
          overflowY: 'scroll',
          backgroundColor: theme.palette.grey['200'],
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            flexDirection: 'column-reverse',
            padding: '48px 20px 20px',
            marginTop: 'auto',
          }}
        >
          <TicketChatMessage
            type={'from'}
            author={'system'}
          />
          <TicketChatMessage
            type={'to'}
            author={'test'}
          />
          <TicketChatMessage
            type={'to'}
            author={'test'}
          />
          <TicketChatMessage
            type={'from'}
            author={'test'}
          />
          <TicketChatMessage
            type={'to'}
            author={'test'}
          />
          <TicketChatMessage
            type={'from'}
            author={'test'}
          />
          <TicketChatMessage
            type={'from'}
            author={'test'}
          />
          <TicketChatMessage
            type={'from'}
            author={'test'}
          />
          <TicketChatMessage
            type={'from'}
            author={'test'}
          />
          <TicketChatMessage
            type={'to'}
            author={'test'}
          />
        </Box>
      </Box>
      <Box
        sx={{
          padding: '20px 20px 28px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            marginBottom: '12px',
          }}
        >
          <Button
            variant={'outlined'}
            color={'primary'}
            disableElevation
          >
              Назначить инженера
          </Button>
          <Button
            variant={'outlined'}
            color={'primary'}
            disableElevation
          >
              Изменить условия для выполнения заявки
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
          }}
        >
          <FieldInput
            value={''}
            name={'message'}
            placeholder={'Введите сообщение'}
            sx={{ width: '100%', maxWidth: '100%' }}
          />
          <Button
            variant={'contained'}
            color={'info'}
            disableElevation
          >
            <Send />
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
