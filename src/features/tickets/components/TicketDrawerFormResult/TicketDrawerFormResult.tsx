import { useCallback, useState } from 'react'
import { QueryKey } from '@features/shared/data'
import { TicketDrawerForm } from '@features/tickets/components/TicketDrawerForm'
import { TicketDescriptionFormResult } from '@features/tickets/data'
import { useApi } from '@hooks/useApi'
import { useNotify } from '@hooks/useNotify'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { queryClient } from '~/api'
import { WorkTaskDetailed, WorkTaskResult } from '~/api/servicepro.generated'

interface TicketDrawerFormResultProps {
  ticket: WorkTaskDetailed
  result: WorkTaskResult | null
}

export const TicketDrawerFormResult = ({ ticket, result }: TicketDrawerFormResultProps) => {
  const { api } = useApi()
  const { notify } = useNotify()
  const { organizationID } = useOrganizationID()
  const [value, setValue] = useState(result?.coordinator_report || result?.executor_report || '')
  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true)

      await api.workSersTasksResultPartialUpdate(ticket.id, organizationID.toString(), {
        report: value,
        photos: [],
        recommendations: [],
        runtime: [],
      })

      notify({
        message: 'Итоговое соглашение успешно изменено',
        variant: 'success',
      })

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [QueryKey.Ticket, ticket.id] }),
        queryClient.invalidateQueries({ queryKey: [QueryKey.TicketStatuses, ticket.id] }),
        queryClient.invalidateQueries({ queryKey: [QueryKey.TicketResult, ticket.id] }),
      ])
    } catch (error) {
      notify({
        message: 'Произошла ошибка при отправке изменений условий для выполнения заявки',
        variant: 'error',
      })
    } finally {
      setLoading(false)
    }
  }, [api, ticket, organizationID, value, notify])

  return (
    <TicketDrawerForm
      value={value}
      title={'Итоговое соглашение'}
      actionLabel={'Отправить'}
      disabled={!TicketDescriptionFormResult.some((status) => ticket?.status === status)}
      loading={loading}
      onChange={setValue}
      onSubmit={handleSubmit}
    />
  )
}
