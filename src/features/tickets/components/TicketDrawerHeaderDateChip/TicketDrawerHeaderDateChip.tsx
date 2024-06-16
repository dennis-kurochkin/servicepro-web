import { useCallback, useState } from 'react'
import { FieldDatepicker } from '@components/Field/components/FieldDatepicker'
import { TooltipNew } from '@components/TooltipNew'
import {
  DATE_FORMAT_DEFAULT,
  DATE_FORMAT_TIME_BEHIND, EMPTY_VALUE_LABEL,
  SYMBOL_QUOTATION_LEFT,
  SYMBOL_QUOTATION_RIGHT,
} from '@constants/index'
import { QueryKey } from '@features/shared/data'
import { TicketDrawerHeaderChip } from '@features/tickets/components/TicketDrawerHeaderChip'
import { StatusEnumTitle } from '@features/tickets/data'
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
        text: `Дата планируемого начала изменена на ${format(newDate, DATE_FORMAT_DEFAULT)}`,
        edits: {
          'plan_start_date': newDate.toISOString(),
        },
      })

      notify({
        message: 'Дата планируемого начала успешно изменена',
        variant: 'success',
      })

      await queryClient.invalidateQueries({ queryKey: [QueryKey.Ticket, ticketID] })

      handleClose()
    } catch (error) {
      notify({
        message: 'Произошла ошибка при изменении даты планируемого начала',
        variant: 'error',
      })
    } finally {
      setSaving(false)
    }
  }, [newDate])

  return status === StatusEnum.Approval ? (
    <TooltipNew
      visible={dateChangeTooltipOpen}
      placement={'bottom'}
      content={(
        <>
          <Typography
            variant={'body2'}
            fontWeight={500}
          >
            Изменить дату планируемого начала
          </Typography>
          <FieldDatepicker
            name={'date'}
            value={newDate}
            disablePast
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
          label={`Начало план: ${planStartDate ? format(new Date(planStartDate), DATE_FORMAT_TIME_BEHIND) : EMPTY_VALUE_LABEL}`}
          sx={{ display: 'flex' }}
          onChange={() => setDateChangeTooltipOpen(true)}
        />
      )}
      interactive
    />
  ) : (
    <TooltipNew
      content={`Изменить дату начала планирования можно только на статусе ${SYMBOL_QUOTATION_LEFT}${StatusEnumTitle[StatusEnum.Approval]}${SYMBOL_QUOTATION_RIGHT}`}
      target={(
        <TicketDrawerHeaderChip
          label={`Начало план: ${planStartDate ? format(new Date(planStartDate), DATE_FORMAT_TIME_BEHIND) : EMPTY_VALUE_LABEL}`}
          sx={{ cursor: 'not-allowed' }}
          disabled
          onChange={() => undefined}
        />
      )}
    />
  )
}
