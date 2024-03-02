import { useLayoutEffect, useRef } from 'react'
import { FieldAutocomplete, FieldInput } from '@components/Field'
import { theme } from '@data/theme'
import { TicketChatMessage } from '@features/tickets/components/TicketChatMessage'
import { Close, DriveFileRenameOutline, Send } from '@mui/icons-material'
import { Box, Button, IconButton, InputAdornment, Link, Typography } from '@mui/material'

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
          padding: '16px 20px 12px',
          boxShadow: 1,
          zIndex: 10,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant={'h6'}
            fontWeight={500}
          >
            Заявка "Путиловец" ООО
          </Typography>
          <IconButton
            size={'small'}
            aria-label="close"
            onClick={onClose}
          >
            <Close />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gap: '8px',
            marginTop: '4px',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Typography
              variant={'body2'}
              color={(theme) => theme.palette.grey['600']}
            >
              Инженер
            </Typography>
            <Typography
              variant={'body2'}
            >
              <Link
                href={'//'}
              >
                Назначить инженера
              </Link>
              {/*<Button*/}
              {/*  size={'small'}*/}
              {/*  variant={'text'}*/}
              {/*  color={'warning'}*/}
              {/*  disableElevation*/}
              {/*>*/}
              {/*  Назначить инженера*/}
              {/*</Button>*/}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '4px',
              marginTop: '4px',
            }}
          >
            <Button
              size={'small'}
              variant={'outlined'}
              color={'info'}
              endIcon={<DriveFileRenameOutline fontSize={'small'} />}
              disableElevation
            >
              Условия для выполнения заявки
            </Button>
            <Button
              size={'small'}
              variant={'outlined'}
              color={'info'}
              endIcon={<DriveFileRenameOutline fontSize={'small'} />}
              disableElevation
            >
              Рекомендации
            </Button>
            <Button
              size={'small'}
              variant={'outlined'}
              color={'info'}
              endIcon={<DriveFileRenameOutline fontSize={'small'} />}
              disableElevation
            >
              Итоговое согласование
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        ref={containerRef}
        id={'container'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'scroll',
          backgroundColor: theme.palette.grey['200'],
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            gap: '16px',
            flexDirection: 'column-reverse',
            padding: '48px 20px 20px',
            marginTop: 'auto',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: '140px',
              top: '0px',
              width: '1px',
              height: 'calc(100% - 20px)',
              background: (theme) => theme.palette.grey['300'],
            }}
          />
          <TicketChatMessage
            author={'system'}
          />
          <TicketChatMessage
            author={'test'}
          />
          <TicketChatMessage
            author={'test'}
          />
          <TicketChatMessage
            author={'test'}
          />
          <TicketChatMessage
            author={'test'}
          />
          <TicketChatMessage
            author={'test'}
          />
          <TicketChatMessage
            author={'test'}
          />
          <TicketChatMessage
            author={'test'}
          />
          <TicketChatMessage
            author={'test'}
          />
          <TicketChatMessage
            author={'test'}
          />
        </Box>
      </Box>
      <Box
        sx={{
          position: 'relative',
          boxShadow: 2,
          zIndex: 10,
          padding: '20px 20px 28px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
          }}
        >
          <FieldAutocomplete
            name={'status'}
            label={'Статус'}
            sx={{
              minWidth: '200px',
            }}
            value={{
              name: 'Без изменений',
              id: 0,
            }}
            options={[
              {
                name: 'Без изменений',
                id: 0,
              },
              {
                name: 'ИСО приступил',
                id: 1,
              },
              {
                name: 'Выполнена',
                id: 2,
              },
              {
                name: 'Ожидание ИСО',
                id: 3,
              },
            ]}
            disableClearable
            labelInside
            onChange={() => {}}
          />
          <FieldInput
            value={''}
            name={'message'}
            placeholder={'Введите сообщение'}
            sx={{ width: '100%', maxWidth: '100%' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Send fontSize={'small'} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
