import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EMPTY_VALUE_DASH } from '@constants/index'
import { TableCellTickets } from '@features/shared/components/TableCellTickets'
import { QueryKey } from '@features/shared/data'
import { useApi } from '@hooks/useApi'
import { useEmployment } from '@hooks/useEmployment'
import { useNotify } from '@hooks/useNotify'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { Box, Chip, TableCell, TableRow, Typography } from '@mui/material'
import { queryClient } from '~/api'
import { WorkOrganization } from '~/api/servicepro.generated'

export interface ClientRowProps {
  data: WorkOrganization
}

export const ClientRow = ({ data }: ClientRowProps) => {
  const navigate = useNavigate()
  const { organizationID } = useOrganizationID()
  const { notify } = useNotify()
  const { api } = useApi()
  const { data: employment } = useEmployment()
  const [selectedTaskID, setSelectedTaskID] = useState<number | null>(data.tasks?.[0]?.id ?? null)
  const selectedTask = useMemo(() => data.tasks.find(({ id }) => id === selectedTaskID) ?? null, [selectedTaskID, data.tasks])

  const handleChangeCoordinator = useCallback(async () => {
    if (!selectedTaskID || !employment?.profile.id) {
      notify({
        message: 'Произошла ошибка при попытка назначить вас координатором заявки',
        variant: 'error',
      })

      return
    }

    try {
      await api.workSersTasksExecutorsPartialUpdate(selectedTaskID, organizationID.toString(), {
        coordinator: employment.profile.id,
      })

      notify({
        message: `Вы назначены координатором заявки "${selectedTask?.title ?? 'Без названия'}"`,
        variant: 'success',
      })
    } catch (error) {
      notify({
        message: 'Произошла ошибка при попытка назначить вас координатором заявки',
        variant: 'error',
      })
    } finally {
      await queryClient.invalidateQueries({ queryKey: [QueryKey.Clients] })
    }
  }, [selectedTaskID, organizationID])

  const handleRowClick = useCallback(async () => {
    navigate(`/${organizationID}/clients/${data.id}`)
  }, [organizationID, data, navigate])

  return (
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
        {data.id}
      </TableCell>
      <TableCell>
        <Typography
          variant={'body2'}
        >
          {data.name}
        </Typography>
      </TableCell>
      <TableCell>
        {data.requisites?.legal_address?.region?.local_name ?? data.requisites?.physical_address?.region?.local_name ?? data.requisites?.postal_address?.region?.local_name ?? EMPTY_VALUE_DASH}
      </TableCell>
      <TableCell>
        {data.requisites?.legal_address?.value ?? data.requisites?.physical_address?.value ?? data.requisites?.postal_address?.value ?? EMPTY_VALUE_DASH}
      </TableCell>
      <TableCell
        onClick={(event) => event.stopPropagation()}
      >
        <TableCellTickets
          selectedTaskID={selectedTaskID}
          tasks={data.tasks}
          onChangeSelectedTaskID={setSelectedTaskID}
          onClickAccept={handleChangeCoordinator}
        />
      </TableCell>
      <TableCell
        align={'center'}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '4px',
            paddingLeft: '8px',
          }}
        >
          <Chip
            size={'medium'}
            label="3"
            color="primary"
          />
          <Chip
            size={'medium'}
            label="13"
            color="warning"
          />
          <Chip
            size={'medium'}
            label="2"
            color="info"
          />
        </Box>
      </TableCell>
    </TableRow>
  )
}
