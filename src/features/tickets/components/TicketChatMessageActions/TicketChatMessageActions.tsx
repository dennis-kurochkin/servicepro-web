import { useCallback } from 'react'
import { DATE_FORMAT_TIME_BEHIND } from '@constants/index'
import { TicketMessageAction, TicketMessageActionLabel } from '@features/tickets/data'
import { useApi } from '@hooks/useApi'
import { Button, Typography } from '@mui/material'
import { format } from 'date-fns'
import { WorkTaskStatusChangeDetailed } from '~/api/servicepro.generated'

interface TicketChatMessageActionsProps {
  ticketID: number | null
  uuid: string
  authorization: string
  statusData: WorkTaskStatusChangeDetailed | null
}

export const TicketChatMessageActions = ({ ticketID, uuid, authorization, statusData }: TicketChatMessageActionsProps) => {
  const { chatApi } = useApi()

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

  return (
    <>
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
      {!!statusData?.buttons?.length && statusData?.verdict_date && (
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
    </>
  )
}
