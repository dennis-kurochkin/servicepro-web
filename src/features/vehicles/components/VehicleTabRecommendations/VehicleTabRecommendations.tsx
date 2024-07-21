import { PanelDataAbsent } from '@components/PanelDataAbsent'
import { DATE_FORMAT_TIME_BEHIND, EMPTY_VALUE_DASH } from '@constants/index'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { VehicleChipRecommendationLevel } from '@features/vehicles/components/VehicleChipRecommendationLevel'
import { VehicleChipRecommendationSolution } from '@features/vehicles/components/VehicleChipRecommendationSolution'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { Box, Card, Chip, Skeleton, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { SolutionEnum } from '~/api/servicepro.generated'

interface VehicleRecommendationsProps {
  vehicleID: number
}

export const VehicleTabRecommendations = ({ vehicleID }: VehicleRecommendationsProps) => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['vehicle', 'recommendations', vehicleID, organizationID],
    queryFn: async () => {
      const { data } = await api.vehicleSersVehiclesRecsList({
        orgId: organizationID.toString(),
        vehicleId: vehicleID.toString(),
      })

      return data
    },
  })
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
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
                    padding: '12px 32px 12px 12px',
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
                  >
                    {rec.title || 'Наименование отсутствует'}
                  </Typography>
                  {!!rec.text && (
                    <Typography
                      sx={{
                        marginTop: '4px',
                      }}
                      variant={'body2'}
                    >
                      {rec.text}
                    </Typography>
                  )}
                  <Box
                    sx={{
                      display: 'flex',
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
