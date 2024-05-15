import { useMemo } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Truck1 from '@assets/truck-1.png'
import Truck2 from '@assets/truck-2.png'
import { FieldAutocomplete, FieldInput } from '@components/Field'
import { DATE_FORMAT_TIME_BEHIND, EMPTY_VALUE_DASH } from '@constants/index'
import { TicketChatContainer } from '@features/tickets/components/TicketChatContainer'
import { TicketChatMessage } from '@features/tickets/components/TicketChatMessage'
import { TicketDrawerEngineerSection } from '@features/tickets/components/TicketDrawerEngineerSection'
import { TicketDrawerFooter } from '@features/tickets/components/TicketDrawerFooter'
import { TicketDrawerForm } from '@features/tickets/components/TicketDrawerForm'
import { TicketDrawerFormsContainer } from '@features/tickets/components/TicketDrawerFormsContainer'
import { TicketDrawerHeader } from '@features/tickets/components/TicketDrawerHeader'
import { TicketDrawerHeaderChip } from '@features/tickets/components/TicketDrawerHeaderChip'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { Send } from '@mui/icons-material'
import { Box, BoxProps, Button, Drawer, InputAdornment, styled } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
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

// const sdf = 'wss://servicepro-chat.humanagro.ru/ws/ws-chat?authorization='

export const TicketDrawer = () => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()
  // const { auth } = useAuth()
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const open = useMemo(() => !!params.ticketID || !!searchParams.get('ticketID'), [params, searchParams])
  const ticketID = useMemo(() => params.ticketID ? +params.ticketID : searchParams.get('ticketID') ? +searchParams.get('ticketID')! : null, [params, searchParams])

  const { data, isFetching } = useQuery({
    queryKey: ['ticket', organizationID],
    queryFn: async () => {
      const { data } = await api.workSersTasksRetrieve(ticketID!, organizationID.toString())
      return data
    },
    refetchOnWindowFocus: false,
    enabled: open,
  })

  // const { readyState } = useWebSocket(`wss://servicepro-chat.humanagro.ru/ws/ws-chat?authorization=${auth?.accessToken}`, {
  //
  // })
  //

  const handleClose = () => {
    if (params.ticketID) {
      navigate(`/${organizationID}/tickets`)
    } else {
      searchParams.delete('ticketID')
      setSearchParams(searchParams)
    }
  }

  return (
    <Drawer
      open={open}
      anchor={'right'}
      onClose={handleClose}
    >
      <ContentWrapper>
        <TicketDrawerHeader
          title={data?.title ?? ''}
          loading={isFetching}
          renderChips={(
            <>
              {data?.service_center.requisites.full_name && (
                <TicketDrawerHeaderChip
                  label={data.service_center.requisites.full_name}
                />
              )}
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
                label={`Начало план: ${data?.approval.plan_start_date ? format(new Date(data?.approval.plan_start_date), DATE_FORMAT_TIME_BEHIND) : EMPTY_VALUE_DASH}`}
              />
              <TicketDrawerHeaderChip
                label={`Завершение план: ${data?.approval.plan_complete_date ? format(new Date(data?.approval.plan_complete_date), DATE_FORMAT_TIME_BEHIND) : EMPTY_VALUE_DASH}`}
              />
            </>
          )}
          onClose={handleClose}
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
              status={StatusEnum.Work}
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
              status={StatusEnum.Work}
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
              status={StatusEnum.Work}
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
              status={StatusEnum.Work}
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
              status={StatusEnum.Work}
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
              status={StatusEnum.Work}
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
              profile={data?.executor?.profile ?? null}
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
    </Drawer>
  )
}
