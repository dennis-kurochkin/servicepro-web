import { MouseEvent, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ButtonIcon } from '@components/ButtonIcon'
import { ChipStatus } from '@components/ChipStatus/ChipStatus'
import { Add, ArrowDropDown, Visibility } from '@mui/icons-material'
import { Box, Button, Menu, MenuItem } from '@mui/material'
import { WorkTaskShort } from '~/api/servicepro.generated'

export interface TableCellTicketsProps {
  selectedTaskID: number | null
  tasks: WorkTaskShort[]
  onChangeSelectedTaskID: (id: number) => void
}

export const TableCellTickets = ({ selectedTaskID, tasks, onChangeSelectedTaskID }: TableCellTicketsProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const open = !!anchorEl
  const selectedTask = useMemo<WorkTaskShort | null>(() => tasks.find(({ id }) => id === selectedTaskID) ?? null, [selectedTaskID])

  const handleClickTicketsMenu = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseTicketsMenu = () => {
    setAnchorEl(null)
  }

  const handleClickOpenTicket = () => {
    if (!selectedTaskID) {
      return
    }

    searchParams.set('ticketID', selectedTaskID.toString())
    setSearchParams(searchParams)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: '4px',
        }}
      >
        {selectedTask && (
          <>
            <Button
              size={'small'}
              variant="contained"
              color={'info'}
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr max-content max-content',
                gap: '6px',
                alignItems: 'center',
                width: '290px',
                height: '32px',
                padding: '0 10px',
                background: 'rgba(0, 0, 0, 0.06)',
                color: (theme) => theme.palette.info.main,
                minWidth: '0',
                '& .MuiButton-startIcon': {
                  marginRight: 0,
                },
                '&:hover': {
                  background: 'rgba(0, 0, 0, 0.12)',
                },
              }}
              disableElevation
              onClick={handleClickTicketsMenu}
            >
              <Box
                sx={{
                  textAlign: 'left',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  fontSize: '11px',
                  color: (theme) => theme.palette.common.black,
                  marginBottom: '-1px',
                }}
              >
                {selectedTask.title}
              </Box>
              <ChipStatus
                size={300}
                status={selectedTask.status}
              />
              <ArrowDropDown
                fontSize={'small'}
                sx={{
                  marginLeft: '-4px',
                  marginRight: '-4px',
                }}
              />
            </Button>
            <ButtonIcon
              Icon={Visibility}
              fontSize={'18px'}
              onClick={handleClickOpenTicket}
            />
            <Box
              sx={{
                height: '24px',
                width: '1px',
                alignSelf: 'center',
                margin: '0 4px',
                background: (theme) => theme.palette.grey['300'],
              }}
            />
          </>
        )}
        <ButtonIcon
          Icon={Add}
          onClick={() => {}}
        />
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        id="client-row-menu"
        onClose={handleCloseTicketsMenu}
      >
        {tasks.map((task) => (
          <MenuItem
            sx={{
              paddingY: '8px',
            }}
            onClick={() => {
              onChangeSelectedTaskID(task.id)
              handleCloseTicketsMenu()
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                gap: '8px',
              }}
            >
              <Box
                sx={{
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  fontSize: '11px',
                  color: (theme) => theme.palette.common.black,
                }}
              >
                {task.title}
              </Box>
              <ChipStatus
                size={300}
                status={task.status}
              />
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
