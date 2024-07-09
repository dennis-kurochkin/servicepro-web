import { useCallback, useState } from 'react'
import { FieldDatepicker } from '@components/Field/components/FieldDatepicker'
import { FieldTimepicker } from '@components/Field/components/FieldTimepicker'
import {
  DATE_FORMAT_TIME_BEHIND, EMPTY_VALUE_LABEL,
  SYMBOL_QUOTATION_LEFT,
  SYMBOL_QUOTATION_RIGHT,
} from '@constants/index'
import { QueryKey } from '@features/shared/data'
import { TicketDrawerHeaderChip } from '@features/tickets/components/TicketDrawerHeaderChip'
import { StatusEnumLabel } from '@features/tickets/data'
import { Tooltip } from '@features/ui/components/Tooltip'
import { useApi } from '@hooks/useApi'
import { useNotify } from '@hooks/useNotify'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Typography } from '@mui/material'
import { format } from 'date-fns'
import { queryClient } from '~/api'
import { StatusEnum } from '~/api/servicepro.generated'

interface TicketDrawerHeaderDateChipProps {
  ticketID: number
  status: StatusEnum | null
  authorization: string
  planStartDate: string | null
}

export const TicketDrawerHeaderDateChip = ({ ticketID, status, authorization, planStartDate }: TicketDrawerHeaderDateChipProps) => {
  const { notify } = useNotify()
  const { chatApi } = useApi()
  const [dateChangeTooltipOpen, setDateChangeTooltipOpen] = useState(false)
  const [newDate, setNewDate] = useState(planStartDate ? new Date(planStartDate) : new Date())
  const [saving, setSaving] = useState(false)

  const handleClose = useCallback(() => {
    setDateChangeTooltipOpen(false)
    setNewDate(new Date())
  }, [])

  const handleSave = useCallback(async () => {
    try {
      setSaving(true)

      await chatApi.createMessageApiChatsTaskIdMessagesPost({
        taskId: ticketID!,
        authorization,
      }, {
        text: `Предложена новая дата планируемого начала: ${format(newDate, DATE_FORMAT_TIME_BEHIND)}`,
        status: StatusEnum.Approval,
        edits: {
          plan_start_date: newDate.toISOString(),
        },
      })

      notify({
        message: 'Дата планируемого начала успешно отправлена на согласование',
        variant: 'success',
      })

      await queryClient.invalidateQueries({ queryKey: [QueryKey.Ticket, ticketID] })

      handleClose()
    } catch (error) {
      notify({
        message: 'Произошла ошибка при отправки даты планируемого начала на согласование',
        variant: 'error',
      })
    } finally {
      setSaving(false)
    }
  }, [newDate, authorization, handleClose, chatApi, notify, ticketID])

  return status === StatusEnum.Approval ? (
    <Tooltip
      visible={dateChangeTooltipOpen}
      placement={'bottom'}
      content={(
        <>
          <Typography
            variant={'body2'}
            fontWeight={500}
          >
            Изменить дату и время планируемого начала
          </Typography>
          <FieldDatepicker
            name={'date'}
            value={newDate}
            disablePast
            onChange={(date) => setNewDate(date ?? new Date())}
          />
          <FieldTimepicker
            name={'time'}
            value={newDate}
            onChange={(date) => setNewDate(date ?? new Date())}
          />
          <Box
            sx={{
              display: 'flex',
              gap: '8px',
            }}
          >
            <LoadingButton
              variant={'contained'}
              size={'small'}
              color={'info'}
              loading={saving}
              disableElevation
              onClick={handleSave}
            >
              Сохранить
            </LoadingButton>
            <Button
              variant={'outlined'}
              size={'small'}
              color={'info'}
              disabled={saving}
              onClick={handleClose}
            >
              Отмена
            </Button>
          </Box>
        </>
      )}
      contentSx={{
        display: 'grid',
        gap: '12px',
        padding: '16px 32px 16px 16px',
      }}
      target={(
        <TicketDrawerHeaderChip
          label={`Дата планируемого начала: ${planStartDate ? format(new Date(planStartDate), DATE_FORMAT_TIME_BEHIND) : EMPTY_VALUE_LABEL}`}
          color={planStartDate ? 'success' : 'error'}
          sx={{ display: 'flex' }}
          onChange={() => setDateChangeTooltipOpen(true)}
        />
      )}
      interactive
    />
  ) : (
    <Tooltip
      content={`Изменить дату начала планирования можно только на статусе ${SYMBOL_QUOTATION_LEFT}${StatusEnumLabel[StatusEnum.Approval]}${SYMBOL_QUOTATION_RIGHT}`}
      target={(
        <TicketDrawerHeaderChip
          label={`Дата планируемого начала: ${planStartDate ? format(new Date(planStartDate), DATE_FORMAT_TIME_BEHIND) : EMPTY_VALUE_LABEL}`}
          color={planStartDate ? 'info' : 'default'}
          sx={{ cursor: 'not-allowed' }}
          disabled
          onChange={() => undefined}
        />
      )}
    />
  )
}
