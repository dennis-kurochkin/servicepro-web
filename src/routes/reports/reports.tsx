import { useCallback, useState } from 'react'
import { FieldDatepicker } from '@components/Field/components/FieldDatepicker'
import { DATE_FORMAT_BACKEND } from '@constants/index'
import { rr1 } from '@features/ui/types'
import { useApi } from '@hooks/useApi'
import { useNotify } from '@hooks/useNotify'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { usePageTitle } from '@hooks/usePageTitle'
import { LoadingButton } from '@mui/lab'
import { Alert, Box, Button, Typography } from '@mui/material'
import { format } from 'date-fns'
import { Report } from '~/api/servicepro.generated'

export const ReportsRoute = () => {
  usePageTitle('Отчеты')

  const { api } = useApi()
  const { organizationID } = useOrganizationID()
  const { notify } = useNotify()

  const [loading, setLoading] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [from, setFrom] = useState<Date | null>(null)
  const [to, setTo] = useState<Date | null>(null)
  const [report, setReport] = useState<Report | null>(null)

  const onChangeFrom = useCallback((date: Date | null) => {
    setFrom(date)
    setTo(null)
  }, [])

  const handleClickDownload = useCallback(() => {
    if (!report?.file) {
      notify({
        variant: 'error',
        message: 'Не удалось скачать отчет, попробуйте сформировать его заново',
      })

      return
    }

    window.open(report.file, '_blank')
  }, [report?.file, notify])

  const handleGetReport = useCallback(async () => {
    setDirty(true)
    setReport(null)

    if (!from || !to) {
      return
    }

    try {
      setLoading(true)

      const { data } = await rr1(api.exportSersReportsCreate)(organizationID.toString(), {
        period_start: format(from, DATE_FORMAT_BACKEND),
        period_stop: format(to, DATE_FORMAT_BACKEND),
      })

      setReport(data)
      setFrom(null)
      setTo(null)
      setDirty(false)
    } catch (error) {
      notify({
        variant: 'error',
        message: 'Не удалось сформировать отчет',
      })
    } finally {
      setLoading(false)
    }
  }, [api.exportSersReportsCreate, from, notify, organizationID, to])

  return (
    <div>
      <Typography
        variant={'h5'}
      >
        Сформировать отчёт
      </Typography>
      {report && (
        <Alert
          variant={'standard'}
          color={'success'}
          sx={{
            width: '600px',
            marginTop: '20px',
          }}
          action={(
            <Button
              variant={'text'}
              size={'medium'}
              color={'success'}
              sx={{ marginTop: '-4px', paddingX: '12px' }}
              disableElevation
              onClick={handleClickDownload}
            >
              Скачать
            </Button>
          )}
        >
          Отчет успешно сформирован
        </Alert>
      )}
      <Box
        sx={{
          width: '600px',
          padding: '24px',
          marginTop: '20px',
          background: (theme) => theme.palette.grey['100'],
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gap: '12px',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          <FieldDatepicker
            name={'from'}
            label={'Период с:'}
            placeholder={'Не выбрано'}
            value={from}
            error={dirty && !from}
            disableFuture
            onChange={onChangeFrom}
          />
          <FieldDatepicker
            name={'to'}
            label={'по:'}
            placeholder={'Не выбрано'}
            value={to}
            disabled={!from}
            error={dirty && !to}
            minDate={from ?? undefined}
            disableFuture
            onChange={setTo}
          />
        </Box>
        <LoadingButton
          variant={'contained'}
          loading={loading}
          sx={{ marginTop: '16px' }}
          onClick={handleGetReport}
        >
          Сформировать
        </LoadingButton>
      </Box>
    </div>
  )
}
