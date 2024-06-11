import { useCallback, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { ButtonIconSquare } from '@components/ButtonIconSquare'
import { FieldAutocomplete, FieldInput } from '@components/Field'
import { TooltipNew } from '@components/TooltipNew'
import { DATE_FORMAT_TIME_BEHIND, EMPTY_VALUE_DASH, PAGINATION_DEFAULT_LIMIT } from '@constants/index'
import { TooltipId } from '@data/tooltips'
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
import { Send, Update } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, BoxProps, Drawer, styled } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { queryClient } from '~/api'
import { Message } from '~/api/servicepro-chat.generated'
import { Profile, RoleEnum, StatusEnum, WorkTaskDetailed } from '~/api/servicepro.generated'

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
  const [newStatus, setNewStatus] = useState<StatusEnum | null>(null)
  const [showStatusField, setShowStatusField] = useState(false)
  const [sendingMessage, setSendingMessage] = useState(false)

  const getSocketUrl = useCallback(async () => {
    const { data: tokenData } = await api.workSersChatTokensCreate(organizationID.toString(), { token: '' })
    setAuthorization(tokenData.token)
    return `wss://servicepro-chat.humanagro.ru/ws/ws-chat?authorization=${tokenData.token}`
  }, [api, organizationID])

  const { readyState } = useWebSocket(getSocketUrl, {
    onMessage: (event) => {
      const data = JSON.parse(event.data) as WSData

      if (data.payload_model === 'NewMessage' && data.payload.task_id === ticketID) {
        queryClient.setQueryData([QueryKey.Chats, ticketID, organizationID], (oldData) => [
          data.payload.message,
          ...oldData as Message[],
        ])

        if (data.payload.message.status) {
          queryClient.setQueryData([QueryKey.Ticket, ticketID, organizationID], (oldData) => ({
            ...oldData as WorkTaskDetailed,
            status: data.payload.message.status,
          }))
        }
      }
    },
  })

  const { data, isFetching } = useQuery({
    queryKey: [QueryKey.Ticket, ticketID, organizationID],
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
    queryKey: [QueryKey.Chats, ticketID, organizationID],
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

  const attachmentsQuery = useQuery({
    queryKey: ['attachments', ticketID, organizationID],
    queryFn: async () => {
      const { data } = await api.workSersTasksAttachmentsList({
        orgId: organizationID.toString(),
        taskId: ticketID?.toString() ?? '',
      })

      return data
    },
    enabled: open && !!ticketID,
  })

  const handleSendMessage = useCallback(async () => {
    if (!newStatus && !message) {
      notify({
        message: 'Для отправки сообщения необходимо ввести текст сообщения, либо изменить статус заявки',
        variant: 'error',
      })

      return
    }

    try {
      setSendingMessage(true)

      await chatApi.createMessageApiChatsTaskIdMessagesPost({
        taskId: ticketID!,
        authorization,
      }, {
        text: message,
        edits: {},
        ...(newStatus ? { status: newStatus } : {}),
      })

      setNewStatus(null)
      setMessage('')
      setShowStatusField(false)
    } catch (error) {
      notify({
        message: 'Произошла ошибка при отправке сообщения',
        variant: 'error',
      })
    } finally {
      setSendingMessage(false)
    }
  }, [newStatus, message, chatApi, ticketID, authorization, notify])

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
                pictures={message.media_files?.map((media) => {
                  if (media.path.includes('http')) {
                    return media.path
                  }

                  return attachmentsQuery.data?.find(({ client_uuid }) => media.path === client_uuid)?.file ?? media.path
                })}
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
            {showStatusField ? (
              <FieldAutocomplete
                name={'status'}
                label={'Статус'}
                sx={{ minWidth: '200px' }}
                value={newStatus ? {
                  value: newStatus,
                  label: StatusEnumTitle[newStatus],
                } : null}
                options={Object.values(StatusEnum).map((value) => ({
                  value,
                  label: StatusEnumTitle[value as StatusEnum],
                }))}
                disabled={sendingMessage}
                labelInside
                onChange={(data) => setNewStatus(data?.value as StatusEnum ?? null)}
              />
            ) : (
              <TooltipNew
                id={TooltipId.TicketDrawerChangeStatus}
                content={'Изменить статус заявки'}
                strategy={'fixed'}
                target={(
                  <div>
                    <ButtonIconSquare
                      color={'info'}
                      variant={'outlined'}
                      disabled={sendingMessage}
                      onClick={() => setShowStatusField(true)}
                    >
                      <Update fontSize={'medium'} />
                    </ButtonIconSquare>
                  </div>
                )}
              />
            )}
            <FieldInput
              value={message}
              name={'message'}
              disabled={sendingMessage}
              placeholder={'Введите сообщение'}
              sx={{ width: '100%', maxWidth: '100%' }}
              onChange={(e) => setMessage(e.target.value)}
            />
            <LoadingButton
              variant={'contained'}
              color={'info'}
              loading={sendingMessage}
              disableElevation
              onClick={handleSendMessage}
            >
              <Send fontSize={'small'} />
            </LoadingButton>
          </Box>
        </TicketDrawerFooter>
      </ContentWrapper>
    </Drawer>
  )
}
