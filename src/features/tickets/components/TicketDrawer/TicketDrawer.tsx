import { useCallback, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ButtonIconSquare } from '@components/ButtonIconSquare'
import { FieldAutocomplete, FieldInput } from '@components/Field'
import { TooltipNew } from '@components/TooltipNew'
import { getEngineerLabel } from '@features/engineers/helpers'
import { SearchParamsKey } from '@features/shared/data'
import { TicketChatContainer } from '@features/tickets/components/TicketChatContainer'
import { TicketChatMessage } from '@features/tickets/components/TicketChatMessage'
import {
  useTicketDrawerQuery,
  useTicketDrawerQueryAttachments,
  useTicketDrawerQueryChats,
  useTicketDrawerQueryResult,
  useTicketDrawerQueryStatuses,
  useTicketDrawerWebSocket,
} from '@features/tickets/components/TicketDrawer/hooks'
import { TicketDrawerFooter } from '@features/tickets/components/TicketDrawerFooter'
import { TicketDrawerFormConditions } from '@features/tickets/components/TicketDrawerFormConditions'
import { TicketDrawerFormRecommendation } from '@features/tickets/components/TicketDrawerFormRecommendation'
import { TicketDrawerFormResult } from '@features/tickets/components/TicketDrawerFormResult'
import { TicketDrawerFormsContainer } from '@features/tickets/components/TicketDrawerFormsContainer'
import { TicketDrawerHeader } from '@features/tickets/components/TicketDrawerHeader'
import { TicketDrawerHeaderChip } from '@features/tickets/components/TicketDrawerHeaderChip'
import { TicketDrawerHeaderDateChip } from '@features/tickets/components/TicketDrawerHeaderDateChip'
import { TicketDrawerParticipantsSection } from '@features/tickets/components/TicketDrawerParticipantsSection'
import { StatusEnumTitle } from '@features/tickets/data'
import { getAvailableStatusOptions } from '@features/tickets/helpers'
import { VehicleChipRecommendationLevel } from '@features/vehicles/components/VehicleChipRecommendationLevel'
import { VehicleChipRecommendationSolution } from '@features/vehicles/components/VehicleChipRecommendationSolution'
import { useApi } from '@hooks/useApi'
import { useNotify } from '@hooks/useNotify'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { Send, Update } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, BoxProps, Drawer, styled } from '@mui/material'
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

export const TicketDrawer = () => {
  const { organizationID } = useOrganizationID()
  const { chatApi } = useApi()
  const [searchParams, setSearchParams] = useSearchParams()
  const params = useParams()
  const navigate = useNavigate()
  const { notify } = useNotify()

  const open = useMemo(() => !!params.ticketID || !!searchParams.get('ticketID'), [params, searchParams])
  const ticketID = useMemo(() => params.ticketID ? +params.ticketID : searchParams.get('ticketID') ? +searchParams.get('ticketID')! : null, [params, searchParams])
  const [message, setMessage] = useState<string>('')
  const [newStatus, setNewStatus] = useState<StatusEnum | null>(null)
  const [showStatusField, setShowStatusField] = useState(false)
  const [sendingMessage, setSendingMessage] = useState(false)

  const { authorization, socket: { readyState } } = useTicketDrawerWebSocket(ticketID)
  const { data, isFetching, isPending, isSuccess, members } = useTicketDrawerQuery(ticketID, open)
  const attachmentsQuery = useTicketDrawerQueryAttachments(ticketID, open)
  const resultQuery = useTicketDrawerQueryResult(ticketID, open)
  const statusesQuery = useTicketDrawerQueryStatuses(ticketID, open)
  const chatsQuery = useTicketDrawerQueryChats(ticketID, authorization, readyState)

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
        ...(newStatus ? { status: newStatus } : {}),
        edits: {},
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
          status={data?.status ?? null}
          loading={isFetching || isPending}
          renderChips={(
            <>
              {data?.service_center.requisites.full_name && (
                <TicketDrawerHeaderChip
                  label={data.service_center.requisites.full_name}
                />
              )}
              <TicketDrawerHeaderChip
                label={data?.vehicle?.model?.equipment?.name || 'Тип техники не указан'}
              />
              <TicketDrawerHeaderChip
                label={(data?.vehicle?.model?.brand.name ?? '' + data?.vehicle?.model?.name ?? '') || 'Модель техники не указана'}
              />
              <TicketDrawerHeaderChip
                label={data?.vehicle?.sn || data?.vehicle?.gos_number || 'Серийный номер техники не задан'}
              />
              <TicketDrawerHeaderChip
                label={data?.vehicle?.manufacture_date ?? 'Год выпуска не указан'}
              />
              <TicketDrawerHeaderDateChip
                ticketID={ticketID!}
                status={data?.status ?? null}
                authorization={authorization}
                planStartDate={data?.approval?.plan_start_date ?? null}
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
            {resultQuery.data && (
              <TicketChatMessage
                ticketID={ticketID!}
                authorization={authorization}
                uuid={''}
                author={data?.executor?.id ?? data?.coordinator?.id ?? null}
                pictures={resultQuery.data?.photos?.map((media) => attachmentsQuery.data?.find(({ client_uuid }) => media.client_uuid === client_uuid)?.file ?? '')}
                content={(
                  <Box
                    sx={{
                      display: 'grid',
                      gap: '6px',
                    }}
                  >
                    <Box
                      fontWeight={500}
                    >
                      Отчет
                    </Box>
                    <Box>
                      {resultQuery.data.coordinator_report || resultQuery.data.executor_report || 'Нет данных'}
                    </Box>
                    <Box
                      fontWeight={500}
                      sx={{ marginTop: '6px' }}
                    >
                      Рекомендация
                    </Box>
                    {resultQuery.data.recommendations?.[0] ? (
                      <Box>
                        <Box>
                          {resultQuery.data.recommendations[0].title || resultQuery.data.recommendations[0].text}
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            gap: '4px',
                            marginTop: '8px',
                          }}
                        >
                          <VehicleChipRecommendationLevel level={resultQuery.data.recommendations[0].level} />
                          <VehicleChipRecommendationSolution solution={resultQuery.data.recommendations[0].solution} />
                        </Box>
                      </Box>
                    ) : 'Нет данных'}
                  </Box>
                )}
                status={data?.status ?? StatusEnum.Done}
                statusData={null}
                date={resultQuery.data?.posted_date ?? resultQuery.data?.check_date ?? resultQuery.data?.updated_at}
                report
              />
            )}
            {chatsQuery.data?.map((message) => (
              <TicketChatMessage
                key={message.uuid}
                ticketID={ticketID!}
                authorization={authorization}
                uuid={message.uuid}
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
                statusData={statusesQuery.data?.find((status) => status.message_uuid === message.uuid) ?? null}
                date={message.server_time}
              />
            ))}
            {isSuccess && (
              <TicketChatMessage
                ticketID={null}
                authorization={authorization}
                uuid={''}
                author={null}
                content={data.approval?.customer_description}
                statusData={null}
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
            {isSuccess && (
              <>
                <TicketDrawerFormConditions
                  ticket={data}
                  statuses={statusesQuery.data ?? []}
                  authorization={authorization}
                />
                {resultQuery.isSuccess && (
                  <>
                    <TicketDrawerFormRecommendation
                      ticket={data}
                      result={resultQuery.data}
                    />
                    <TicketDrawerFormResult
                      ticket={data}
                      result={resultQuery.data}
                    />
                  </>
                )}
              </>
            )}
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
                options={getAvailableStatusOptions(data?.status ?? StatusEnum.Done)}
                disabled={sendingMessage}
                labelInside
                onChange={(data) => setNewStatus(data?.value as StatusEnum ?? null)}
              />
            ) : (
              <TooltipNew
                content={'Изменить статус заявки'}
                strategy={'fixed'}
                target={(
                  <div>
                    <ButtonIconSquare
                      color={'info'}
                      variant={'outlined'}
                      disabled={sendingMessage || getAvailableStatusOptions(data?.status ?? StatusEnum.Done).length === 0}
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
