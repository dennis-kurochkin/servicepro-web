import { useState } from 'react'
import { PanelDataAbsent } from '@components/PanelDataAbsent'
import { DATE_FORMAT_TIME_BEHIND, EMPTY_VALUE_DASH } from '@constants/index'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { QueryKey } from '@features/shared/data'
import { VehicleChipRecommendationLevel } from '@features/vehicles/components/VehicleChipRecommendationLevel'
import { VehicleChipRecommendationSolution } from '@features/vehicles/components/VehicleChipRecommendationSolution'
import { useApi } from '@hooks/useApi'
import { useNotify } from '@hooks/useNotify'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { Box, Button, Card, Chip, Skeleton, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { queryClient } from '~/api'
import { SolutionEnum, VehicleRecommendationDetailed } from '~/api/servicepro.generated'

interface VehicleRecommendationsProps {
  vehicleID: number
}

export const VehicleTabRecommendations = ({ vehicleID }: VehicleRecommendationsProps) => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()
  const { notify } = useNotify()

  const [loading, setLoading] = useState(false)

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: [QueryKey.VehicleRecommendations, vehicleID, organizationID],
    queryFn: async () => {
      const { data } = await api.vehicleSersVehiclesRecsList({
        orgId: organizationID.toString(),
        vehicleId: vehicleID.toString(),
      })

      return data
    },
  })

  const handleMarkComplete = async (recommendation: VehicleRecommendationDetailed) => {
    try {
      setLoading(true)

      await api.vehicleSersVehiclesRecsPartialUpdate(recommendation.id, organizationID.toString(), vehicleID.toString(), {
        solution: SolutionEnum.Complete,
      })

      await queryClient.invalidateQueries({ queryKey: [QueryKey.VehicleRecommendations] })
    } catch (error) {
      notify({
        message: 'Не удалось отметить рекоммендацию выполненной',
        variant: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      {isFetching ? (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              width={'50%'}
              height={100}
              variant={'rounded'}
            />
          ))}
        </>
      ) : (
        <>
          {isSuccess && data.length > 0 ? (
            <>
              {data.map((rec) => (
                <Card
                  key={rec.id}
                  variant={'outlined'}
                  sx={{
                    padding: '12px',
                    borderRadius: 2,
                    background: (theme) => theme.palette.grey['200'],
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '8px',
                      marginBottom: '12px',
                    }}
                  >
                    <VehicleChipRecommendationLevel level={rec.level} />
                    <VehicleChipRecommendationSolution solution={rec.solution} />
                    <Chip
                      variant={'outlined'}
                      color={'default'}
                      label={`Дата создания: ${rec.created_at ? format(new Date(rec.created_at), DATE_FORMAT_TIME_BEHIND) : EMPTY_VALUE_DASH}`}
                      size={'small'}
                    />
                    {rec.solution === SolutionEnum.Complete && (
                      <Chip
                        variant={'outlined'}
                        color={'default'}
                        label={`Дата выполнения: ${rec.solution_date ? format(new Date(rec.solution_date), DATE_FORMAT_TIME_BEHIND) : EMPTY_VALUE_DASH}`}
                        size={'small'}
                      />
                    )}
                  </Box>
                  <Typography
                    variant={'subtitle1'}
                    sx={{
                      fontSize: '17px',
                    }}
                  >
                    {rec.title || 'Наименование отсутствует'}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      gap: '12px',
                      marginTop: '12px',
                    }}
                  >
                    <Box>
                      <Typography
                        variant={'subtitle2'}
                      >
                        Автор
                      </Typography>
                      <EngineerAvatar
                        profile={rec.author?.profile ?? null}
                        emptyLabel={'Отсутствует'}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant={'subtitle2'}
                      >
                        Аудитор
                      </Typography>
                      <EngineerAvatar
                        profile={rec.auditor?.profile ?? null}
                        emptyLabel={'Отсутствует'}
                      />
                    </Box>
                    {rec.solution !== SolutionEnum.Complete && (
                      <Button
                        variant={'contained'}
                        color={'success'}
                        sx={{ marginLeft: 'auto' }}
                        disabled={loading}
                        disableElevation
                        onClick={() => handleMarkComplete(rec)}
                      >
                        Отметить выполненной
                      </Button>
                    )}
                  </Box>
                </Card>
              ))}
            </>
          ) : <PanelDataAbsent />}
        </>
      )}
    </Box>
  )
}
