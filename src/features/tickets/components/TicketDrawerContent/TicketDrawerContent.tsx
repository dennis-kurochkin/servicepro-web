import Truck1 from '@assets/truck-1.png'
import Truck2 from '@assets/truck-2.png'
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
import { Box, BoxProps, Button, InputAdornment, styled } from '@mui/material'
import { StatusEnum } from '~/api/servicepro.generated'

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
            author={{
              name: 'Сергей Сергеевич',
              role: 'Координатор',
            }}
            pictures={[
              Truck1,
              Truck2,
            ]}
            content={'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation'}
            status={(
              <ChipStatus
                status={StatusEnum.Work}
                filled
              />
            )}
            date={(
              <>
                16.06.2023
                <br/>
                16:00, пн
              </>
            )}
            actions={(
              <>
                <Button
                  variant={'contained'}
                  size={'small'}
                  color={'success'}
                  disableElevation
                >
                  Принять
                </Button>
                <Button
                  variant={'contained'}
                  size={'small'}
                  color={'error'}
                  disableElevation
                >
                  Отклонить
                </Button>
              </>
            )}
          />
          <TicketChatMessage
            author={{
              name: 'Евгений Евгеньевич',
              role: 'ИСО',
            }}
            content={'ИСО приступил'}
            status={(
              <ChipStatus
                status={StatusEnum.Work}
                filled
              />
            )}
            date={(
              <>
                16.06.2023
                <br/>
                10:30, вт
              </>
            )}
          />
          <TicketChatMessage
            author={{
              name: 'Сергей Сергеевич',
              role: 'Координатор',
            }}
            content={'Просим предоставить кран 25т'}
            status={(
              <ChipStatus
                status={StatusEnum.Work}
                filled
              />
            )}
            date={(
              <>
                16.06.2023
                <br/>
                9:15, вт
              </>
            )}
          />
          <TicketChatMessage
            author={{
              name: 'Евгений Евгеньевич',
              role: 'ИСО',
            }}
            content={'Кран отсутствует'}
            status={(
              <ChipStatus
                status={StatusEnum.Work}
                filled
              />
            )}
            date={(
              <>
                16.06.2023
                <br/>
                09:00, вт
              </>
            )}
          />
          <TicketChatMessage
            author={{
              name: 'Сергей Сергеевич',
              role: 'Координатор',
            }}
            content={'Условия: необходим кран 25т на 9:00 16.06.2023'}
            status={(
              <ChipStatus
                status={StatusEnum.Work}
                filled
              />
            )}
            date={(
              <>
                15.06.2023
                <br/>
                11:00, пн
              </>
            )}
            actions={(
              <Button
                variant={'contained'}
                size={'small'}
                color={'success'}
                disableElevation
                disabled
              >
                Принято
              </Button>
            )}
          />
          <TicketChatMessage
            author={{
              name: 'Сергей Сергеевич',
              role: 'Координатор',
            }}
            content={'Ближайшая возможная дата и время 16.06.2023 9:00'}
            status={(
              <ChipStatus
                status={StatusEnum.Work}
                filled
              />
            )}
            date={(
              <>
                15.06.2023
                <br/>
                09:00, пн
              </>
            )}
            actions={(
              <Button
                variant={'contained'}
                size={'small'}
                color={'success'}
                disableElevation
                disabled
              >
                Принято
              </Button>
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
