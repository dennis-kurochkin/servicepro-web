import { useState } from 'react'
import { PanelDataAbsent } from '@components/PanelDataAbsent'
import { TableWrapper } from '@components/TableWrapper/TableWrapper'
import { DATE_FORMAT_TIME_AHEAD, EMPTY_VALUE_DASH } from '@constants/index'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { QueryKey } from '@features/shared/data'
import { VehicleDrawerRuntimeAdd } from '@features/vehicles/components/VehicleDrawerRuntimeAdd'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { Add } from '@mui/icons-material'
import { Box, Button, Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

interface VehicleTabRuntimeProps {
  vehicleID: number
}

export const VehicleTabRuntime = ({ vehicleID }: VehicleTabRuntimeProps) => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()

  const [runtimeDrawerOpen, setRuntimeDrawerOpen] = useState(false)

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: [QueryKey.VehicleRuntime, vehicleID, organizationID],
    queryFn: async () => {
      const { data } = await api.vehicleSersVehiclesRuntimeList({
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
          onClick={() => setRuntimeDrawerOpen(true)}
        >
          Записать наработку
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
              <TableWrapper
                sx={{
                  margin: 0,
                }}
              >
                <Table
                  size={'small'}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        size={'small'}
                      />
                      <TableCell
                        size={'small'}
                      >
                        Наработка
                      </TableCell>
                      <TableCell
                        size={'small'}
                      >
                        Дата&nbsp;записи
                      </TableCell>
                      <TableCell
                        size={'small'}
                      >
                        Автор
                      </TableCell>
                      <TableCell
                        size={'small'}
                      >
                        Аудитор
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((record) => (
                      <TableRow
                        key={record.id}
                      >
                        <TableCell>
                          {record.id}
                        </TableCell>
                        <TableCell>
                          {record.value || EMPTY_VALUE_DASH}
                        </TableCell>
                        <TableCell>
                          {record.created_at ? format(new Date(record.created_at), DATE_FORMAT_TIME_AHEAD) : EMPTY_VALUE_DASH}
                        </TableCell>
                        <TableCell
                          sx={{
                            paddingRight: '16px',
                          }}
                        >
                          <EngineerAvatar
                            profile={record.author?.profile ?? null}
                            emptyLabel={'Отсутствует'}
                          />
                        </TableCell>
                        <TableCell
                          sx={{
                            paddingRight: '16px',
                          }}
                        >
                          <EngineerAvatar
                            profile={record.auditor?.profile ?? null}
                            emptyLabel={'Отсутствует'}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableWrapper>
            </>
          ) : <PanelDataAbsent />}
        </>
      )}
      <VehicleDrawerRuntimeAdd
        open={runtimeDrawerOpen}
        vehicleID={vehicleID}
        onClose={() => setRuntimeDrawerOpen(false)}
      />
    </Box>
  )
}
