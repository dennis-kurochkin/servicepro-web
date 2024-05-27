import { useCallback, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { FieldAutocomplete, FieldInput } from '@components/Field'
import { DATE_FORMAT_TIME_BEHIND, EMPTY_VALUE_DASH, PAGINATION_DEFAULT_LIMIT } from '@constants/index'
import { getEngineerLabel } from '@features/engineers/helpers'
import { QueryKey, SearchParamsKey } from '@features/shared/data'
import { TicketChatContainer } from '@features/tickets/components/TicketChatContainer'
import { TicketChatMessage } from '@features/tickets/components/TicketChatMessage'
import { TicketDrawerFooter } from '@features/tickets/components/TicketDrawerFooter'
import { TicketDrawerForm } from '@features/tickets/components/TicketDrawerForm'
import { TicketDrawerFormsContainer } from '@features/tickets/components/TicketDrawerFormsContainer'
import { TicketDrawerHeader } from '@features/tickets/components/TicketDrawerHeader'
import { TicketDrawerHeaderChip } from '@features/tickets/components/TicketDrawerHeaderChip'
import { TicketDrawerParticipantsSection } from '@features/tickets/components/TicketDrawerParticipantsSection'
import { StatusEnumTitle } from '@features/tickets/data'
import { useApi } from '@hooks/useApi'
import { useNotify } from '@hooks/useNotify'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { Send } from '@mui/icons-material'
import { Box, BoxProps, Drawer, InputAdornment, styled } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { queryClient } from '~/api'
import { Message } from '~/api/servicepro-chat.generated'
import { Profile, RoleEnum, StatusEnum } from '~/api/servicepro.generated'

type WSData = {
  payload_model: 'NewMessage',
  payload: {
    task_id: number,
    message: Message
  }
} | {
  payload_model: 'Other',
  payload: undefined
}

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

export const TicketDrawer = () => {
  const { organizationID } = useOrganizationID()
  const { api, chatApi } = useApi()
  const [searchParams, setSearchParams] = useSearchParams()
  const params = useParams()
  const navigate = useNavigate()
  const { notify } = useNotify()

  const open = useMemo(() => !!params.ticketID || !!searchParams.get('ticketID'), [params, searchParams])
  const ticketID = useMemo(() => params.ticketID ? +params.ticketID : searchParams.get('ticketID') ? +searchParams.get('ticketID')! : null, [params, searchParams])
  const [authorization, setAuthorization] = useState('')
  const [members, setMembers] = useState<{ [key: number]: { profile: Profile, role: RoleEnum } }>({})
  const [message, setMessage] = useState<string>('')

  const getSocketUrl = useCallback(async () => {
    const { data: tokenData } = await api.workSersChatTokensCreate(organizationID.toString(), { token: '' })
    setAuthorization(tokenData.token)
    return `wss://servicepro-chat.humanagro.ru/ws/ws-chat?authorization=${tokenData.token}`
  }, [api, organizationID])

  const { readyState } = useWebSocket(getSocketUrl, {
    onMessage: (event) => {
      const data = JSON.parse(event.data) as WSData

      if (data.payload_model === 'NewMessage') {
        queryClient.setQueryData([QueryKey.Chats, organizationID], (oldData) => [
          data.payload.message,
          ...oldData as Message[],
        ])
      }
    },
  })

  const { data, isFetching } = useQuery({
    queryKey: [QueryKey.Ticket, organizationID],
    queryFn: async () => {
      const { data } = await api.workSersTasksRetrieve(ticketID!, organizationID.toString())

      setMembers({
        ...(data.executor?.id ? {
          [data.executor.id]: {
            profile: data.executor.profile,
            role: RoleEnum.Engineer,
          },
        } : {}),
        ...(data.coordinator?.id ? {
          [data.coordinator.id]: {
            profile: data.coordinator.profile,
            role: RoleEnum.Coordinator,
          },
        } : {}),
        ...(data.customer?.id ? {
          [data.customer.id]: {
            profile: data.customer.profile,
            role: RoleEnum.Client,
          },
        } : {}),
      })

      return data
    },
    refetchOnWindowFocus: false,
    enabled: open,
  })

  const chatsQuery = useQuery({
    queryKey: [QueryKey.Chats, organizationID],
    queryFn: async () => {
      const { data } = await chatApi.getMessagesApiChatsTaskIdMessagesGet({
        taskId: ticketID!,
        authorization,
        offset: 0,
        limit: PAGINATION_DEFAULT_LIMIT,
      })

      return data
    },
    refetchOnWindowFocus: false,
    enabled: readyState === ReadyState.OPEN && !!ticketID,
  })

  const handleSendMessage = async () => {
    try {
      await chatApi.createMessageApiChatsTaskIdMessagesPost({
        taskId: ticketID!,
        authorization,
      }, {
        text: message,
        edits: {},
      })

      setMessage('')
    } catch (error) {
      notify({
        message: 'Произошла ошибка при отправке сообщения',
        variant: 'error',
      })
    }
  }

  const handleClose = () => {
    if (params.ticketID) {
      navigate(`/${organizationID}/tickets`)
    } else {
      searchParams.delete(SearchParamsKey.TicketID)
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
          subtitle={getEngineerLabel(data?.customer?.profile ?? {})}
          status={data?.status ?? StatusEnum.Wait}
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
            {chatsQuery.data?.map((message) => (
              <TicketChatMessage
                key={message.uuid}
                author={members[message.employee_id] ? {
                  id: message.employee_id,
                  name: getEngineerLabel(members[message.employee_id].profile),
                  photo: members[message.employee_id].profile.photo ?? undefined,
                  role: members[message.employee_id].role,
                } : message.employee_id}
                pictures={message.media_files?.map((media) => media.path)}
                content={message.text}
                status={message.status as StatusEnum}
                date={message.server_time}
              />
            ))}
            {data && (
              <TicketChatMessage
                author={null}
                content={data.approval?.customer_description}
                date={data.created_at ?? ''}
              />
            )}
          </TicketChatContainer>
          <TicketDrawerFormsContainer>
            {typeof ticketID === 'number' && (
              <TicketDrawerParticipantsSection
                ticketID={ticketID}
                engineer={data?.executor?.profile ?? null}
                coordinator={data?.coordinator?.profile ?? null}
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
              {...{} /* @ts-expect-error ERROR */}
              options={Object.values(StatusEnum).map((value) => ({
                name: StatusEnumTitle[value as StatusEnum],
                id: value.toString(),
              }))}
              disableClearable
              labelInside
              onChange={() => {}}
            />
            <FieldInput
              value={message}
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
              onChange={(e) => setMessage(e.target.value)}
            />
          </Box>
        </TicketDrawerFooter>
      </ContentWrapper>
    </Drawer>
  )
}
