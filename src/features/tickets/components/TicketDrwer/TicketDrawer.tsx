import { useCallback, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import Truck1 from '@assets/truck-1.png'
import Truck2 from '@assets/truck-2.png'
import { FieldAutocomplete, FieldInput } from '@components/Field'
import { DATE_FORMAT_TIME_BEHIND, EMPTY_VALUE_DASH } from '@constants/index'
import { QueryKey } from '@features/shared/data'
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
import axios from 'axios'
import { format } from 'date-fns'
import { StatusEnum } from '~/api/servicepro.generated'

// const connectionStatus = {
//   [ReadyState.CONNECTING]: 'Connecting',
//   [ReadyState.OPEN]: 'Open',
//   [ReadyState.CLOSING]: 'Closing',
//   [ReadyState.CLOSED]: 'Closed',
//   [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
// }

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
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [token, setToken] = useState('')
  const navigate = useNavigate()

  const open = useMemo(() => !!params.ticketID || !!searchParams.get('ticketID'), [params, searchParams])
  const ticketID = useMemo(() => params.ticketID ? +params.ticketID : searchParams.get('ticketID') ? +searchParams.get('ticketID')! : null, [params, searchParams])

  const { data, isFetching } = useQuery({
    queryKey: [QueryKey.Ticket, organizationID],
    queryFn: async () => {
      const { data } = await api.workSersTasksRetrieve(ticketID!, organizationID.toString())
      return data
    },
    refetchOnWindowFocus: false,
    enabled: open,
  })

  const getSocketUrl = useCallback(async () => {
    const { data: tokenData } = await api.workSersChatTokensCreate(organizationID.toString(), { token: '' })
    setToken(tokenData.token)
    return `wss://servicepro-chat.humanagro.ru/ws/ws-chat?authorization=${tokenData.token}`
  }, [api, organizationID])

  const { readyState, sendJsonMessage } = useWebSocket(getSocketUrl, {

  })

  const chatsQuery = useQuery({
    queryKey: [QueryKey.Chats, organizationID],
    queryFn: async () => {
      const { data: statuses } = await api.workSersTasksStatusesList({
        orgId: organizationID.toString(),
        taskId: ticketID!.toString(),
      })
      console.log(statuses)
      const { data: activechats } = await axios.get(`https://servicepro-chat.humanagro.ru/api/active-chats?authorization=${token}`)
      console.log(activechats)
      const { data } = await axios.get(`https://servicepro-chat.humanagro.ru/api/chats/${ticketID!}/messages?offset=0&limit=20&authorization=${token}`)
      return data
    },
    refetchOnWindowFocus: false,
    enabled: readyState === ReadyState.OPEN && !!ticketID,
  })

  console.log('chatsQuery', chatsQuery)

  const handleSendMessage = async () => {
    await axios.post(`https://servicepro-chat.humanagro.ru/api/chats/${ticketID!}/messages`, {
      text: 'hello',
    })
    sendJsonMessage({
      'task_id':1,
      'message':{
        'uuid':'00028e3a-b583-b31c-38f4-efd789418865',
      },
      'employee_id':4,
      'text':'Я Денис',
      'status':'',
      'client_time':'2024-05-06T22:55:36.483000Z',
      'server_time':'2024-05-06T22:55:46.819139Z',
    })
  }

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
            {typeof ticketID === 'number' && (
              <TicketDrawerEngineerSection
                ticketID={ticketID}
                profile={data?.executor?.profile ?? null}
              />
            )}
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
                  <InputAdornment
                    position="end"
                    onClick={handleSendMessage}
                  >
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
