import { useCallback, useMemo, useState } from 'react'
import { SYMBOL_QUOTATION_LEFT, SYMBOL_QUOTATION_RIGHT } from '@constants/index'
import { QueryKey } from '@features/shared/data'
import { TicketDrawerForm } from '@features/tickets/components/TicketDrawerForm'
import { TicketStatusesConditionsChange } from '@features/tickets/data'
import { useApi } from '@hooks/useApi'
import { useNotify } from '@hooks/useNotify'
import { queryClient } from '~/api'
import {
  StatusEnum,
  WorkTaskDetailed,
  WorkTaskEventVerdict,
  WorkTaskStatusChangeDetailed,
} from '~/api/servicepro.generated'

interface TicketDrawerFormConditionsProps {
  ticket: WorkTaskDetailed
  statuses: WorkTaskStatusChangeDetailed[]
  authorization: string
}

export const TicketDrawerFormConditions = ({ ticket, statuses, authorization }: TicketDrawerFormConditionsProps) => {
  const { chatApi } = useApi()
  const { notify } = useNotify()
  const [value, setValue] = useState(ticket.approval.coordinator_description || ticket.approval.customer_description || '')
  const [loading, setLoading] = useState(false)

  const editable = useMemo(() => TicketStatusesConditionsChange.some((status) => ticket?.status === status), [ticket])
  const showAlert = useMemo(() => statuses.some((status) => status.edits.coordinator_description && status.verdict === WorkTaskEventVerdict.Discuss) && editable, [statuses, editable])

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true)

      await chatApi.createMessageApiChatsTaskIdMessagesPost({
        taskId: ticket.id,
        authorization,
      }, {
        text: `Предложены обновленные условия для выполнения заявки: ${SYMBOL_QUOTATION_LEFT + value + SYMBOL_QUOTATION_RIGHT}`,
        status: StatusEnum.Approval,
        edits: {
          coordinator_description: value,
        },
      })

      await queryClient.invalidateQueries({ queryKey: [QueryKey.Ticket, ticket.id] })
      await queryClient.invalidateQueries({ queryKey: [QueryKey.TicketStatuses, ticket.id] })
    } catch (error) {
      notify({
        message: 'Произошла ошибка при отправке изменений условий для выполнения заявки',
        variant: 'error',
      })
    } finally {
      setLoading(false)
    }
  }, [chatApi, ticket, authorization, value, notify])

  return (
    <TicketDrawerForm
      value={value}
      title={'Условия для выполнения заявки'}
      alert={showAlert ? 'Уже есть текст условий для выполнения заявки на согласовании' : undefined}
      actionLabel={'Отправить на согласование'}
      disabled={!TicketStatusesConditionsChange.some((status) => ticket?.status === status)}
      loading={loading}
      onChange={setValue}
      onSubmit={handleSubmit}
    />
  )
}
