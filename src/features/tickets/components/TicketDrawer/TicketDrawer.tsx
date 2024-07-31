import { useCallback, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ButtonIconSquare } from '@components/ButtonIconSquare'
import { Dropzone } from '@components/Dropzone'
import { FieldAutocomplete, FieldInput } from '@components/Field'
import { getEngineerLabel } from '@features/engineers/helpers'
import { SearchParamsKey } from '@features/shared/data'
import { TicketChatContainer } from '@features/tickets/components/TicketChatContainer'
import { TicketChatMessage } from '@features/tickets/components/TicketChatMessage'
import { TicketChatMessageActions } from '@features/tickets/components/TicketChatMessageActions'
import { TicketChatReportActions } from '@features/tickets/components/TicketChatReportActions'
import { TicketChatResultContent } from '@features/tickets/components/TicketChatResultContent'
import { TicketChatReview } from '@features/tickets/components/TicketChatReview'
import {
  useTicketDrawerQuery,
  useTicketDrawerQueryAttachments,
  useTicketDrawerQueryChats,
  useTicketDrawerQueryResult, useTicketDrawerQueryReviews,
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
import { StatusEnumLabel } from '@features/tickets/data'
import { getAvailableStatusOptions } from '@features/tickets/helpers'
import { Tooltip } from '@features/ui/components/Tooltip'
import { rr2 } from '@features/ui/types'
import { toBase64 } from '@helpers/index'
import { useApi } from '@hooks/useApi'
import { useNotify } from '@hooks/useNotify'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { AttachFile, Delete, Send, Update } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, BoxProps, Drawer, IconButton, styled } from '@mui/material'
import { v4 } from 'uuid'
import { StatusEnum } from '~/api/servicepro.generated'

interface FileExtended extends File {
  id: string
  src: string
  blob: File,
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
  const { chatApi, api } = useApi()
  const [searchParams, setSearchParams] = useSearchParams()
  const params = useParams()
  const navigate = useNavigate()
  const { notify } = useNotify()

  const open = useMemo(() => !!params.ticketID || !!searchParams.get('ticketID'), [params, searchParams])
  const ticketID = useMemo(() => params.ticketID ? +params.ticketID : searchParams.get('ticketID') ? +searchParams.get('ticketID')! : null, [params, searchParams])
  const [message, setMessage] = useState<string>('')
  const [files, setFiles] = useState<FileExtended[]>([])
  const [newStatus, setNewStatus] = useState<StatusEnum | null>(null)
  const [showStatusField, setShowStatusField] = useState(false)
  const [sendingMessage, setSendingMessage] = useState(false)

  const { authorization, socket: { readyState } } = useTicketDrawerWebSocket(ticketID)
  const { data, isFetching, isPending, isSuccess, members } = useTicketDrawerQuery(ticketID, open)
  const attachmentsQuery = useTicketDrawerQueryAttachments(ticketID, open)
  const resultQuery = useTicketDrawerQueryResult(ticketID, open)
  const reviewsQuery = useTicketDrawerQueryReviews(ticketID, open)
  const statusesQuery = useTicketDrawerQueryStatuses(ticketID, open)
  const chatsQuery = useTicketDrawerQueryChats(ticketID, authorization, readyState)

  const resultPictures = resultQuery.data?.photos?.map((media) => attachmentsQuery.data?.find(({ client_uuid }) => media.client_uuid === client_uuid)?.file ?? '') ?? []

  const handleAddFiles = (files: File[]) => {
    setFiles((prev) => [...prev, ...files.map((file) => ({
      ...file,
      id: v4(),
      src: URL.createObjectURL(file),
      blob: file,
    }))])
  }

  const handleRemove = (id: string) => {
    const index = files.findIndex((file) => file.id === id)

    if (index !== -1) {
      setFiles((files) => [...files.slice(0, index), ...files.slice(index + 1)])
    }
  }

  const handleSendMessage = useCallback(async () => {
    if (!newStatus && !message) {
      notify({
        message: 'Для отправки сообщения необходимо ввести текст сообщения, либо изменить статус заявки',
        variant: 'error',
      })

      return
    }

    const attachments = await Promise.all(files.map(async (file) => {
      const { data } = await rr2(api.workSersTasksAttachmentsCreate)(organizationID.toString(), ticketID!.toString(), {
        file: await toBase64(file.blob),
        title: file.name,
        client_uuid: file.id,
      })

      return data.client_uuid ?? ''
    }))

    try {
      setSendingMessage(true)

      await chatApi.createMessageApiChatsTaskIdMessagesPost({
        taskId: ticketID!,
        authorization,
      }, {
        text: message,
        ...(newStatus ? { status: newStatus } : {}),
        attachments,
        edits: {},
      })

      setNewStatus(null)
      setMessage('')
      setFiles([])
      setShowStatusField(false)
    } catch (error) {
      notify({
        message: 'Произошла ошибка при отправке сообщения',
        variant: 'error',
      })
    } finally {
      setSendingMessage(false)
    }
  }, [newStatus, message, files, notify, api.workSersTasksAttachmentsCreate, organizationID, ticketID, chatApi, authorization])

  const handleClose = () => {
    setShowStatusField(false)
    setFiles([])

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
                planStartDate={data?.approval?.plan_start_date ?? data?.approval?.want_start_date ?? null}
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
            {reviewsQuery.data?.[0] && (
              <TicketChatReview
                value={reviewsQuery.data[0].value}
                text={reviewsQuery.data[0].text}
              />
            )}
            {resultQuery.data && (
              <>
                {resultQuery?.data.coordinator_report && (
                  <TicketChatMessage
                    author={data?.coordinator?.id ?? null}
                    pictures={resultPictures}
                    status={data?.status ?? StatusEnum.Done}
                    date={resultQuery.data?.posted_date ?? resultQuery.data?.check_date ?? resultQuery.data?.updated_at}
                    content={(
                      <TicketChatResultContent
                        report={resultQuery.data.coordinator_report ?? null}
                        recommendation={resultQuery.data.recommendations?.[0] || {}}
                      />
                    )}
                    actions={(
                      <TicketChatReportActions
                        ticketID={ticketID!}
                        status={data?.status ?? StatusEnum.Done}
                        verdictDate={resultQuery.data?.customer_mark_date ?? null}
                        customerMark={resultQuery.data?.customer_mark}
                      />
                    )}
                  />
                )}
                <TicketChatMessage
                  author={data?.executor?.id ?? null}
                  pictures={resultQuery?.data.coordinator_report ? undefined : resultPictures}
                  status={StatusEnum.Done}
                  date={resultQuery.data?.posted_date ?? resultQuery.data?.check_date ?? resultQuery.data?.updated_at}
                  content={(
                    <TicketChatResultContent
                      report={resultQuery.data.executor_report ?? null}
                      recommendation={{
                        ...(resultQuery.data.recommendations?.[0] ?? {}),
                        title: resultQuery.data.recommendations?.[0].executor_title,
                      }}
                    />
                  )}
                  actions={resultQuery?.data.coordinator_report ? undefined : (
                    <TicketChatReportActions
                      ticketID={ticketID!}
                      status={data?.status ?? StatusEnum.Done}
                      verdictDate={resultQuery.data?.check_date ?? null}
                      customerMark={resultQuery.data?.customer_mark}
                      report={resultQuery.data.executor_report}
                    />
                  )}
                />
              </>
            )}
            {chatsQuery.data?.map((message) => (
              <TicketChatMessage
                key={message.uuid}
                author={members[message.employee_id] ? {
                  id: message.employee_id,
                  name: getEngineerLabel(members[message.employee_id].profile),
                  photo: members[message.employee_id].profile.photo ?? undefined,
                  role: members[message.employee_id].role,
                } : message.employee_id}
                pictures={message.media_files?.map((media) => attachmentsQuery.data?.find(({ client_uuid }) => media.path === client_uuid)?.file ?? media.path)}
                status={message.status as StatusEnum}
                date={message.server_time}
                content={message.text}
                actions={(
                  <TicketChatMessageActions
                    ticketID={ticketID!}
                    uuid={message.uuid}
                    authorization={authorization}
                    statusData={statusesQuery.data?.find((status) => status.message_uuid === message.uuid) ?? null}
                  />
                )}
              />
            ))}
            {isSuccess && (
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
                status={data?.status ?? StatusEnum.Processing}
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
                      disabled={!!resultQuery.data?.customer_mark_date && data?.status === StatusEnum.Done}
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
          <Dropzone
            files={files}
            touched={false}
            maxFiles={10}
            format={'photo'}
            content={(open) => (
              <>
                {files.length > 0 && (
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, 70px)',
                      gap: '8px',
                      padding: '16px 16px 0',
                    }}
                  >
                    {files.map((file) => (
                      <Box
                        key={file.id}
                        sx={{
                          position: 'relative',
                          aspectRatio: '1',
                        }}
                      >
                        <img
                          src={file.src}
                          alt={file.name}
                          style={{
                            display: 'block',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '4px',
                          }}
                        />
                        <IconButton
                          size={'small'}
                          color={'error'}
                          sx={{
                            position: 'absolute',
                            right: '-12px',
                            top: '-12px',
                          }}
                          onClick={() => handleRemove(file.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                )}
                <Box
                  sx={{
                    display: 'flex',
                    flexGrow: 1,
                    gap: '8px',
                    padding: '16px',
                  }}
                >
                  {showStatusField ? (
                    <FieldAutocomplete
                      name={'status'}
                      label={'Статус'}
                      sx={{ minWidth: '200px' }}
                      value={newStatus ? {
                        value: newStatus,
                        label: StatusEnumLabel[newStatus],
                      } : null}
                      options={getAvailableStatusOptions(data?.status ?? StatusEnum.Done)}
                      disabled={sendingMessage}
                      labelInside
                      onChange={(data) => setNewStatus(data?.value as StatusEnum ?? null)}
                    />
                  ) : (
                    <Tooltip
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
                  <ButtonIconSquare
                    color={'info'}
                    variant={'outlined'}
                    disabled={sendingMessage}
                    onClick={open}
                  >
                    <AttachFile
                      fontSize={'medium'}
                      sx={{
                        transform: 'rotate(45deg)',
                      }}
                    />
                  </ButtonIconSquare>
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
              </>
            )}
            onChange={handleAddFiles}
          />
        </TicketDrawerFooter>
      </ContentWrapper>
    </Drawer>
  )
}
