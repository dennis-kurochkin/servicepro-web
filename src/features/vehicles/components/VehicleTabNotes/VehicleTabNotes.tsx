import { useState } from 'react'
import { PanelDataAbsent } from '@components/PanelDataAbsent'
import { DATE_FORMAT_TIME_BEHIND, EMPTY_VALUE_DASH } from '@constants/index'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { QueryKey } from '@features/shared/data'
import { VehicleDrawerNoteAdd } from '@features/vehicles/components/VehicleDrawerNoteAdd'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { Add } from '@mui/icons-material'
import { Box, Button, Card, Chip, Skeleton, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

interface VehicleTabNotesProps {
  vehicleID: number
}

export const VehicleTabNotes = ({ vehicleID }: VehicleTabNotesProps) => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()

  const [drawerOpen, setDrawerOpen] = useState(false)

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: [QueryKey.VehicleNotes, vehicleID, organizationID],
    queryFn: async () => {
      const { data } = await api.vehicleSersVehiclesNotesList({
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          marginTop: '-8px',
          marginBottom: '8px',
        }}
      >
        <Button
          color={'info'}
          variant={'contained'}
          startIcon={<Add />}
          disableElevation
          onClick={() => setDrawerOpen(true)}
        >
          Добавить заметку
        </Button>
      </Box>
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
                    width: '100%',
                    background: (theme) => theme.palette.grey['200'],
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
                    {note.text || 'Текст отсутствует'}
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
      <VehicleDrawerNoteAdd
        open={drawerOpen}
        vehicleID={vehicleID}
        onClose={() => setDrawerOpen(false)}
      />
    </Box>
  )
}
