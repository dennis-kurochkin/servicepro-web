import { ReactNode, useCallback, useMemo, useState } from 'react'
import { DialogPhotoSlider } from '@components/DialogPhotoSlider'
import { useDialogPhotoSliderUtils } from '@components/DialogPhotoSlider/hooks/useDialogPhotoSliderUtils'
import { DATE_FORMAT_DEFAULT, DATE_FORMAT_TIME_BEHIND, DATE_FORMAT_TIME_DAY } from '@constants/index'
import { theme } from '@data/theme'
import { TicketChipStatus } from '@features/shared/components/TicketChipStatus/TicketChipStatus'
import { QueryKey, RoleLabel } from '@features/shared/data'
import { useQueryDrawerEmployee } from '@features/shared/hooks/useQueryDrawerEmployee'
import { EmployeeProfile } from '@features/shared/types'
import { TICKET_CHAT_OFFSET_LEFT } from '@features/tickets/constants'
import { TicketMessageAction, TicketMessageActionLabel } from '@features/tickets/data'
import { useApi } from '@hooks/useApi'
import { useNotify } from '@hooks/useNotify'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { DisplaySettings, Person } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Avatar, Box, Button, Card, Typography } from '@mui/material'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { queryClient } from '~/api'
import { RoleEnum, StatusEnum, WorkTaskStatusChangeDetailed } from '~/api/servicepro.generated'

export interface TicketChatMessageProps {
  ticketID: number | null
  authorization: string
  uuid: string
  author: null | number | EmployeeProfile
  content: ReactNode | string
  pictures?: string[]
  status?: StatusEnum
  statusData: WorkTaskStatusChangeDetailed | null
  date: string
  report?: boolean
}

export const TicketChatMessage = ({ ticketID, authorization, uuid, author, content, pictures, status, date, statusData, report = false }: TicketChatMessageProps) => {
  const { setCurrentPictureIndex } = useDialogPhotoSliderUtils()
  const { notify } = useNotify()
  const { api, chatApi } = useApi()
  const { organizationID } = useOrganizationID()
  const [isDialogPhotoSliderOpen, setDialogPhotoSliderOpen] = useState(false)
  const [isAcceptLoading, setIsAcceptLoading] = useState(false)
  const hasStatus = useMemo(() => !!(author && (report || !!status)), [author, report, status])

  const { data: profile } = useQueryDrawerEmployee(typeof author === 'object' ? -1 : author)

  const handlePerformAction = useCallback(async (action: TicketMessageAction) => {
    await chatApi.useMessageButtonApiChatsTaskIdMessagesMessageUuidButtonsPost({
      taskId: ticketID!,
      authorization,
      messageUuid: uuid,
    }, {
      name: action,
      client_time: new Date().toISOString(),
    })
  }, [ticketID, chatApi, uuid, authorization])

  const handleAcceptResult = useCallback(async () => {
    try {
      setIsAcceptLoading(true)

      await api.workSersTasksResultApplyPartialUpdate(ticketID!, organizationID.toString())

      await queryClient.invalidateQueries({ queryKey: [QueryKey.Ticket, ticketID] })
      await queryClient.invalidateQueries({ queryKey: [QueryKey.TicketsGeos] })
    } catch (error) {
      notify({
        message: 'Произошла ошибка при принятии результата',
        variant: 'error',
      })
    } finally {
      setIsAcceptLoading(false)
    }
  }, [api, ticketID, organizationID, notify])

  const authorProfile = useMemo(() => typeof author === 'number' ? (profile ?? {
    id: -1,
    name: 'Система',
    role: RoleEnum.Server,
  }) : author, [profile, author])

  const handleCloseDialogPhotoSlider = () => {
    setDialogPhotoSliderOpen(false)
  }

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: hasStatus ? '116px 130px 1fr' : '120px 1fr',
          alignItems: 'start',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '44px',
            left: `${TICKET_CHAT_OFFSET_LEFT - 4}px`,
            width: '9px',
            height: '9px',
            borderRadius: '50%',
            backgroundColor: (theme) => theme.palette.grey['400'],
          }}
        />
        <Typography
          variant={'body2'}
          color={(theme) => theme.palette.grey['600']}
          sx={{
            marginTop: '32px',
            fontSize: '12px',
            wordSpacing: '4px',
          }}
        >
          {format(new Date(date), DATE_FORMAT_DEFAULT)}
          <br/>
          {format(new Date(date), DATE_FORMAT_TIME_DAY, { locale: ru })}
        </Typography>
        {hasStatus && (
          <Box
            sx={{
              marginTop: '36px',
              paddingRight: '20px',
            }}
          >
            <TicketChipStatus
              status={report ? StatusEnum.Done : status}
              size={300}
              sx={{ width: '100%' }}
              filled
            />
          </Box>
        )}
        <Box
          sx={{
            display: 'grid',
            gap: '8px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {author && (
              <Avatar
                sx={{
                  width: '24px',
                  height: '24px',
                }}
                src={authorProfile?.photo}
                alt={authorProfile?.name ?? 'Система'}
              >
                {!authorProfile ? <DisplaySettings fontSize={'small'} /> : <Person fontSize={'small'} />}
              </Avatar>
            )}
            <Typography
              variant={'body2'}
            >
              {author && (
                <>
                  {authorProfile?.name ?? 'Система'}{' '}
                </>
              )}
              <Box
                component={'span'}
                sx={{
                  color: (theme) => theme.palette.grey['700'],
                }}
              >
                {authorProfile ? (
                  <>
                    {`  •  ${RoleLabel[authorProfile.role]}`}
                  </>
                ) : 'Описание задачи'}
              </Box>
            </Typography>
          </Box>
          <Card
            elevation={0}
            sx={{
              position: 'relative',
              overflow: 'visible',
              background: theme.palette.background.paper,
              padding: '8px 16px 12px 12px',
              borderRadius: author ? '8px 8px 8px 0' : '8px',
            }}
          >
            {author && (
              <Box
                sx={{
                  position: 'absolute',
                  left: '-10px',
                  bottom: 0,
                  width: 0,
                  height: 0,
                  borderStyle: 'solid',
                  borderWidth: '0 0 10px 10px',
                  borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
                  transform: 'rotate(0deg)',
                }}
              />
            )}
            <Typography
              variant={'body2'}
              sx={{ wordBreak: 'break-word' }}
            >
              {content ? content : (
                <Box
                  component={'span'}
                  sx={{ color: (theme) => theme.palette.grey['700'] }}
                >
                  Текст отсутствует
                </Box>
              )}
            </Typography>
          </Card>
          {!!pictures?.length && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
              }}
            >
              {pictures.map((picture, index) => (
                <Box
                  key={index}
                  sx={{
                    aspectRatio: 1,
                    backgroundColor: (theme) => theme.palette.grey['700'],
                    backgroundImage: `url(${picture})`,
                    backgroundSize: 'cover',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setCurrentPictureIndex(index)
                    setDialogPhotoSliderOpen(true)
                  }}
                />
              ))}
            </Box>
          )}
          {(statusData?.buttons || report) && (
            <Box
              sx={{
                display: 'grid',
                gap: '8px',
                gridTemplateColumns: '1fr 1fr',
              }}
            >
              {report && (
                <LoadingButton
                  variant={'contained'}
                  size={'small'}
                  color={'success'}
                  disabled={status === StatusEnum.Done}
                  loading={isAcceptLoading}
                  disableElevation
                  onClick={handleAcceptResult}
                >
                  {status === StatusEnum.Done ? 'Принято' : 'Принять'}
                </LoadingButton>
              )}
              {statusData?.buttons.map((action) => (
                <Button
                  key={action.name}
                  variant={'contained'}
                  size={'small'}
                  color={[TicketMessageAction.Rejected, TicketMessageAction.Reject].some((value) => value === action.name) ? 'primary' : 'info'}
                  disabled={action.active}
                  disableElevation
                  onClick={() => handlePerformAction(action.name as TicketMessageAction)}
                >
                  {TicketMessageActionLabel[action.name as TicketMessageAction]}
                </Button>
              ))}
              {(statusData?.buttons?.length || report) && statusData?.verdict_date && (
                <Typography
                  variant={'body2'}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingRight: statusData?.buttons?.some((button) => button.name === TicketMessageAction.Applied) ? '12px' : 0,
                    paddingLeft: statusData?.buttons?.some((button) => button.name === TicketMessageAction.Rejected) ? '4px' : 0,
                    order: statusData?.buttons?.some((button) => button.name === TicketMessageAction.Rejected) ? -1 : undefined,
                    color: (theme) => theme.palette.grey['700'],
                    fontSize: '13px',
                  }}
                >
                  {format(new Date(statusData.verdict_date!), DATE_FORMAT_TIME_BEHIND)}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>
      {!!pictures?.length && (
        <DialogPhotoSlider
          open={isDialogPhotoSliderOpen}
          images={pictures}
          onClose={handleCloseDialogPhotoSlider}
        />
      )}
    </>
  )
}
