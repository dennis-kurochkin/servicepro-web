import { useCallback, useState } from 'react'
import { DATE_FORMAT_TIME_BEHIND } from '@constants/index'
import { QueryKey } from '@features/shared/data'
import { useApi } from '@hooks/useApi'
import { useNotify } from '@hooks/useNotify'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { LoadingButton } from '@mui/lab'
import { Typography } from '@mui/material'
import { format } from 'date-fns'
import { queryClient } from '~/api'
import { StatusEnum } from '~/api/servicepro.generated'

interface TicketChatReportActionsProps {
  ticketID: number | null
  status: StatusEnum
  verdictDate: string | null
  customerMark: string | null
  report?: string
}

export const TicketChatReportActions = ({ ticketID, status, verdictDate, customerMark, report }: TicketChatReportActionsProps) => {
  const { notify } = useNotify()
  const { api } = useApi()
  const { organizationID } = useOrganizationID()
  const [isAcceptLoading, setIsAcceptLoading] = useState(false)

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

  const handleSubmitAndAcceptResult = useCallback(async () => {
    if (!ticketID || !report) {
      return
    }

    setIsAcceptLoading(true)

    await api.workSersTasksResultPartialUpdate(ticketID, organizationID.toString(), {
      report,
      photos: [],
      recommendations: [],
      runtime: [],
    })

    await handleAcceptResult()
  }, [api, handleAcceptResult, organizationID, report, ticketID])

  return (
    <>
      <LoadingButton
        variant={'contained'}
        size={'small'}
        color={'success'}
        disabled={status === StatusEnum.Done}
        loading={isAcceptLoading}
        disableElevation
        onClick={report ? handleSubmitAndAcceptResult : handleAcceptResult}
      >
        {verdictDate ? (
          <>
            {customerMark === 'rejected' ? 'Отклонен' : 'Согласован'}
          </>
        ) : 'Согласовать'}
      </LoadingButton>
      {(verdictDate || status === StatusEnum.Done) && (
        <Typography
          variant={'body2'}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            order: customerMark === 'rejected' ? -1 : undefined,
            color: (theme) => theme.palette.grey['700'],
            fontSize: '13px',
          }}
        >
          {verdictDate ? format(new Date(verdictDate), DATE_FORMAT_TIME_BEHIND) : 'На согласовании у клиента'}
        </Typography>
      )}
    </>
  )
}
