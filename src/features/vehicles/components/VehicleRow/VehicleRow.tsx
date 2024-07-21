import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonIcon } from '@components/ButtonIcon'
import { Tooltip } from '@components/Tooltip'
import { EMPTY_VALUE_DASH } from '@constants/index'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { DialogEngineerAssign } from '@features/shared/components/DialogEngineerAssign'
import { TableCellTickets } from '@features/shared/components/TableCellTickets'
import { QueryKey } from '@features/shared/data'
import { useOpenTicketDrawer } from '@features/tickets/hooks/useOpenTicketDrawer'
import { useApi } from '@hooks/useApi'
import { useNotify } from '@hooks/useNotify'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { NoteAdd } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, TableCell, TableRow, Typography } from '@mui/material'
import { queryClient } from '~/api'
import { WorkVehicle } from '~/api/servicepro.generated'

export interface VehicleRow {
  vehicle: WorkVehicle
}

export const VehicleRow = ({ vehicle }: VehicleRow) => {
  const navigate = useNavigate()
  const { organizationID } = useOrganizationID()
  const { notify } = useNotify()
  const { api } = useApi()
  const { openTicketDrawer } = useOpenTicketDrawer()

  const [selectedTaskID, setSelectedTaskID] = useState<number | null>(vehicle.tasks?.[0]?.id ?? null)
  const selectedTask = useMemo(() => vehicle.tasks?.find(({ id }) => id === selectedTaskID) ?? null, [selectedTaskID, vehicle.tasks])

  const [engineerAssignOpen, setEngineerAssignOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRowClick = useCallback(async () => {
    navigate(`/${organizationID}/vehicles/${vehicle.id}`)
  }, [organizationID, vehicle, navigate])

  const handleCreateTicket = async () => {
    try {
      setLoading(true)

      const { data } = await api.workSersTasksCreate(organizationID.toString(), {
        approval: {},
        new_photos: [],
        longitude: 0,
        latitude: 0,
        organization: organizationID,
        vehicle: vehicle.id,
        parent: null,
      })

      notify({
        message: 'Заявка добавлена',
        variant: 'success',
      })

      await queryClient.invalidateQueries({ queryKey: [QueryKey.Vehicles] })

      setLoading(false)

      openTicketDrawer(data.id)
    } catch (error) {
      notify({
        message: 'Не удалось добавить заявку',
        variant: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <TableRow
        sx={{
          cursor: 'pointer',
          '&:last-child td, &:last-child th': { border: 0 },
        }}
        hover
        onClick={handleRowClick}
      >
        <TableCell
          size={'small'}
        >
          {vehicle.id}
        </TableCell>
        <TableCell>
          {vehicle.model.brand.name || EMPTY_VALUE_DASH}
        </TableCell>
        <TableCell>
          {vehicle.model.name || EMPTY_VALUE_DASH}
        </TableCell>
        <TableCell>
          <img
            src={vehicle.model.equipment.icon}
            alt={vehicle.model.brand.name || EMPTY_VALUE_DASH}
            style={{ display: 'block' }}
          />
        </TableCell>
        <TableCell>
          {vehicle.sn ? `SN ${vehicle.sn}` : EMPTY_VALUE_DASH}
        </TableCell>
        <TableCell>
          {vehicle.summary?.runtime_sum ? `${vehicle.summary.runtime_sum}мч` : EMPTY_VALUE_DASH}
        </TableCell>
        <TableCell
          onClick={(e) => e.stopPropagation()}
        >
          <TableCellTickets
            selectedTaskID={selectedTaskID}
            tasks={vehicle.tasks ?? []}
            onClickAssign={!vehicle.tasks?.length ? undefined : () => setEngineerAssignOpen(true)}
            onChangeSelectedTaskID={setSelectedTaskID}
          />
        </TableCell>
        <TableCell
          onClick={(e) => e.stopPropagation()}
        >
          <EngineerAvatar
            profile={selectedTask?.executor?.profile ?? null}
          />
        </TableCell>
        <TableCell
          sx={{ paddingRight: '12px' }}
          onClick={(e) => e.stopPropagation()}
        >
          <Tooltip
            visible={loading ? false : undefined}
            contentSx={{
              cursor: 'default',
              maxWidth: '200px',
              padding: '8px',
            }}
            content={(
              <>
                <Typography
                  variant={'body1'}
                >
                  Создать новую заявку для этой техники?
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '8px',
                    marginTop: '8px',
                  }}
                >
                  <LoadingButton
                    color={'info'}
                    variant={'contained'}
                    size={'small'}
                    loading={loading}
                    sx={{ flexGrow: 1 }}
                    onClick={handleCreateTicket}
                  >
                    Создать
                  </LoadingButton>
                </Box>
              </>
            )}
            target={(
              <ButtonIcon
                Icon={NoteAdd}
                fontSize={'20px'}
                disabled={loading}
              />
            )}
            interactive
          />
        </TableCell>
      </TableRow>
      {selectedTaskID && (
        <DialogEngineerAssign
          open={engineerAssignOpen}
          selectedTaskID={selectedTaskID}
          onClose={() => setEngineerAssignOpen(false)}
        />
      )}
    </>
  )
}
