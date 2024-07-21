import { ChangeEvent, useCallback, useState } from 'react'
import { FieldInput } from '@components/Field'
import { QueryKey } from '@features/shared/data'
import { VehicleChipRecommendationLevel } from '@features/vehicles/components/VehicleChipRecommendationLevel'
import { useApi } from '@hooks/useApi'
import { useNotify } from '@hooks/useNotify'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { Send } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Radio, RadioGroup, Typography } from '@mui/material'
import { queryClient } from '~/api'
import { LevelEnum, WorkTaskDetailed, WorkTaskResult } from '~/api/servicepro.generated'

interface TicketDrawerFormRecommendationProps {
  ticket: WorkTaskDetailed
  result: WorkTaskResult | null
}

export const TicketDrawerFormRecommendation = ({ ticket, result }: TicketDrawerFormRecommendationProps) => {
  const { api } = useApi()
  const { notify } = useNotify()
  const { organizationID } = useOrganizationID()
  const [value, setValue] = useState(result?.recommendations?.[0]?.title || '')
  const [level, setLevel] = useState(LevelEnum.Warning)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setError(false)
  }

  const handleSubmit = useCallback(async () => {
    if (!value) {
      setError(true)
      return
    }

    try {
      setLoading(true)

      await api.workSersTasksResultEditPartialUpdate(ticket.id, organizationID.toString(), {
        recommendations: {
          edit: {
            [result?.recommendations?.[0]?.id?.toString() ?? '0']: {
              level,
              title: value,
              text: '',
            },
          },
        },
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
  }, [api, ticket, organizationID, value, notify, level, result?.recommendations])

  return (
    <Box
      sx={{
        padding: '16px 16px 12px',
        borderTop: '1px solid',
        borderColor: (theme) => theme.palette.grey['200'],
      }}
    >
      <Typography
        variant={'h6'}
      >
        Рекомендация
      </Typography>
      <FieldInput
        value={value}
        name={'text'}
        placeholder={'Введите текст'}
        disabled={loading}
        minRows={3}
        maxRows={6}
        error={error}
        sx={{ marginTop: '12px' }}
        multiline
        onChange={handleChange}
      />
      <RadioGroup
        value={level}
        sx={{
          marginTop: '12px',
        }}
        onChange={(_, level) => setLevel(level as LevelEnum)}
      >
        {Object.values(LevelEnum).reverse().map((value) => (
          <Box
            key={value}
            sx={{
              display: 'flex',
              gap: '4px',
              alignItems: 'center',
            }}
          >
            <Radio
              value={value}
              size={'small'}
              sx={{
                padding: '6px',
              }}
            />
            <VehicleChipRecommendationLevel level={value} />
          </Box>
        ))}
      </RadioGroup>
      <LoadingButton
        variant={'outlined'}
        size={'small'}
        endIcon={<Send fontSize={'small'} />}
        sx={{ marginTop: '12px' }}
        disabled={false}
        loading={loading}
        onClick={handleSubmit}
      >
        Отправить
      </LoadingButton>
    </Box>
  )
}
