import { ChipStatus } from '@components/ChipStatus/ChipStatus'
import { FieldAutocomplete, FieldInput } from '@components/Field'
import { TicketChatContainer } from '@features/tickets/components/TicketChatContainer'
import { TicketChatMessage } from '@features/tickets/components/TicketChatMessage'
import { TicketDrawerEngineerSection } from '@features/tickets/components/TicketDrawerEngineerSection'
import { TicketDrawerFooter } from '@features/tickets/components/TicketDrawerFooter'
import { TicketDrawerForm } from '@features/tickets/components/TicketDrawerForm'
import { TicketDrawerFormsContainer } from '@features/tickets/components/TicketDrawerFormsContainer'
import { TicketDrawerHeader } from '@features/tickets/components/TicketDrawerHeader'
import { TicketDrawerHeaderChip } from '@features/tickets/components/TicketDrawerHeaderChip'
import { Send } from '@mui/icons-material'
import { Box, BoxProps, InputAdornment, styled } from '@mui/material'

const ContentWrapper = styled(Box)<BoxProps>(() => ({
  flexGrow: 1,
  display: 'grid',
  gridTemplateRows: 'min-content 1fr max-content',
  padding: '0',
  width: '80vw',
  maxWidth: '1200px',
  minWidth: '550px',
  height: '100vh',
}))

interface TicketDrawerContentProps {
  onClose: () => void
}

export const TicketDrawerContent = ({ onClose }: TicketDrawerContentProps) => {
  return (
    <ContentWrapper>
      <TicketDrawerHeader
        title={'Заявка "Путиловец" ООО'}
        renderChips={(
          <>
            <TicketDrawerHeaderChip
              label={'ООО СПК Колос'}
            />
            <TicketDrawerHeaderChip
              label={'Туман 3'}
            />
            <TicketDrawerHeaderChip
              label={'ТО - 2'}
            />
            <TicketDrawerHeaderChip
              label={'ИСО - Иванов Иван Иванович'}
            />
            <TicketDrawerHeaderChip
              label={'Начало план: 15.06.2023 9:00'}
            />
            <TicketDrawerHeaderChip
              label={'Завершение план: 15.06.2023 12:00'}
            />
          </>
        )}
        onClose={onClose}
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          overflow: 'hidden',
        }}
      >
        <TicketChatContainer>
          <TicketChatMessage
            author={'Иванов Иван Иванович'}
            content={'ТекстТекстТекст'}
            status={<ChipStatus status={'started'} />}
            date={(
              <>
                02.06.2024
                <br/>
                18:00, вт
              </>
            )}
          />
          <TicketChatMessage
            author={'system'}
            content={'Инженер принял заявку'}
            status={<ChipStatus status={'started'} />}
            date={(
              <>
                02.06.2024
                <br/>
                14:00, вт
              </>
            )}
          />
          <TicketChatMessage
            author={'Сергей Сергеевич'}
            content={'Можете приехать 02.08.23 в 6:00?'}
            status={<ChipStatus status={'processing'} />}
            date={(
              <>
                02.06.2024
                <br/>
                11:00, вт
              </>
            )}
          />
          <TicketChatMessage
            author={'Иванов Иван Иванович'}
            content={'Ближайшая возможная дата и время 01.09.2023 15-00'}
            status={<ChipStatus status={'processing'} />}
            date={(
              <>
                01.06.2024
                <br/>
                10:00, пн
              </>
            )}
          />
        </TicketChatContainer>
        <TicketDrawerFormsContainer>
          <TicketDrawerEngineerSection
            data={Math.random() > 0.5 ? null : 'engineer'}
          />
          <TicketDrawerForm
            title={'Условия для выполнения заявки'}
          />
          <TicketDrawerForm
            title={'Рекомендации'}
          />
          <TicketDrawerForm
            title={'Итоговое соглашение'}
          />
        </TicketDrawerFormsContainer>
      </Box>
      <TicketDrawerFooter>
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
          }}
        >
          <FieldAutocomplete
            name={'status'}
            label={'Статус'}
            sx={{ minWidth: '200px' }}
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
      </TicketDrawerFooter>
    </ContentWrapper>
  )
}
