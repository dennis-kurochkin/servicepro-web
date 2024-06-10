import { PanelDataAbsent } from '@components/PanelDataAbsent'
import { DATE_FORMAT_TIME_BEHIND, EMPTY_VALUE_DASH } from '@constants/index'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { Box, Card, Chip, Skeleton, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

interface VehicleTabNotesProps {
  vehicleID: number
}

export const VehicleTabNotes = ({ vehicleID }: VehicleTabNotesProps) => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['vehicle', 'notes', vehicleID, organizationID],
    queryFn: async () => {
      const { data } = await api.vehicleSersVehiclesDocsList({
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
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              width={'100%'}
              height={80}
              variant={'rounded'}
            />
          ))}
        </>
      ) : (
        <>
          {isSuccess && data.length > 0 ? (
            <>
              {data.map((note) => (
                <Card
                  key={note.id}
                  variant={'outlined'}
                  sx={{
                    padding: '12px 32px 12px 12px',
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '8px',
                      marginBottom: '12px',
                    }}
                  >
                    <Chip
                      variant={'outlined'}
                      color={'default'}
                      label={`Дата создания: ${note.created_at ? format(new Date(note.created_at), DATE_FORMAT_TIME_BEHIND) : EMPTY_VALUE_DASH}`}
                      size={'small'}
                    />
                  </Box>
                  <Typography
                    variant={'subtitle1'}
                  >
                    {note.title || 'Текст отсутствует'}
                  </Typography>
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
                        profile={note.author?.profile ?? null}
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
