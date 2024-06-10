import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { Box, Card, Skeleton } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

interface VehicleRecommendationsProps {
  vehicleID: number
}

export const VehicleRecommendations = ({ vehicleID }: VehicleRecommendationsProps) => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['vehicle', 'recommendations', vehicleID, organizationID],
    queryFn: async () => {
      const { data } = await api.vehicleSersVehiclesRecsList({
        orgId: organizationID.toString(),
        vehicleId: vehicleID.toString(),
      })

      console.log(data)

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
              height={54}
              variant={'rounded'}
            />
          ))}
        </>
      ) : (
        <>
          {isSuccess && (
            <>
              {data.map((rec) => (
                <Card
                  key={rec.id}
                  variant={'outlined'}
                  sx={{
                    padding: '12px',
                    borderRadius: 2,
                  }}
                >
                  {rec.title}
                </Card>
              ))}
            </>
          )}
        </>
      )}
    </Box>
  )
}
