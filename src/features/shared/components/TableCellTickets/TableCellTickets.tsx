import { MouseEvent, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ButtonIcon } from '@components/ButtonIcon'
import { TooltipNew } from '@components/TooltipNew'
import { EMPTY_VALUE_DASH } from '@constants/index'
import { TooltipId } from '@data/tooltips'
import { getEngineerLabel } from '@features/engineers/helpers'
import { TicketChipStatus } from '@features/shared/components/TicketChipStatus/TicketChipStatus'
import { SearchParamsKey } from '@features/shared/data'
import { useProfile } from '@hooks/useProfile'
import { ArrowDropDown, CheckCircle, ManageAccounts, Visibility } from '@mui/icons-material'
import { Box, Button, Menu, MenuItem } from '@mui/material'
import { SerWorkTaskVerbose, WorkTaskShort, WorkTaskShortWithExecutor } from '~/api/servicepro.generated'

export interface TableCellTicketsProps {
  selectedTaskID: number | null
  tasks: (WorkTaskShort | SerWorkTaskVerbose | WorkTaskShortWithExecutor)[]
  disableView?: boolean
  showClient?: boolean
  onChangeSelectedTaskID: (id: number) => void
  onClickAssign?: () => void
  onClickAccept?: () => void
}

export const TableCellTickets = ({ selectedTaskID, tasks, disableView = false, showClient = false, onChangeSelectedTaskID, onClickAssign, onClickAccept }: TableCellTicketsProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { employment } = useProfile()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const open = !!anchorEl
  const selectedTask = useMemo<WorkTaskShort | SerWorkTaskVerbose | WorkTaskShortWithExecutor | null>(() => tasks.find(({ id }) => id === selectedTaskID) ?? tasks[0] ?? null, [selectedTaskID, tasks])
  const isTaskAlreadyAssigned = employment?.profile?.id === selectedTask?.coordinator

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

    searchParams.set(SearchParamsKey.TicketID, selectedTaskID.toString())
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
        {tasks.length > 0 && selectedTask ? (
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
              <TicketChipStatus
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
            {!disableView && (
              <TooltipNew
                id={TooltipId.TicketsCellViewButton}
                content={'Посмотреть заявку'}
                target={(
                  <ButtonIcon
                    Icon={Visibility}
                    fontSize={'18px'}
                    onClick={handleClickOpenTicket}
                  />
                )}
              />
            )}
            {onClickAccept && (
              <Box
                sx={{
                  height: '24px',
                  width: '1px',
                  alignSelf: 'center',
                  margin: '0 4px',
                  background: (theme) => theme.palette.grey['300'],
                }}
              />
            )}
            {onClickAccept && (
              <TooltipNew
                id={TooltipId.TicketsCellAcceptButton}
                content={isTaskAlreadyAssigned ? 'Заявка уже назначена на вас' : 'Принять заявку'}
                target={(
                  <ButtonIcon
                    Icon={CheckCircle}
                    fontSize={'20px'}
                    disabled={isTaskAlreadyAssigned}
                    onClick={onClickAccept}
                  />
                )}
              />
            )}
          </>
        ) : (
          <Box>
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
                opacity: 0.4,
              }}
              disabled
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
                Заявки отсутствуют
              </Box>
              <ArrowDropDown
                fontSize={'small'}
                sx={{
                  marginLeft: '-4px',
                  marginRight: '-8px',
                }}
              />
            </Button>
          </Box>
        )}
        {onClickAssign && (
          <>
            <Box
              sx={{
                height: '24px',
                width: '1px',
                alignSelf: 'center',
                margin: '0 4px',
                background: (theme) => theme.palette.grey['300'],
              }}
            />
            <TooltipNew
              id={TooltipId.TicketsCellAssignButton}
              content={'Назначить заявку'}
              target={(
                <ButtonIcon
                  Icon={ManageAccounts}
                  fontSize={'18px'}
                  onClick={onClickAssign}
                />
              )}
            />
          </>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        id="client-row-menu"
        onClose={handleCloseTicketsMenu}
      >
        {(tasks as SerWorkTaskVerbose[]).map((task) => (
          <MenuItem
            key={task.id}
            sx={{ paddingY: '8px' }}
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
                {showClient && (
                  <>
                    {' '}
                    <span
                      style={{
                        fontWeight: 400,
                      }}
                    >
                      {task.customer?.profile ? getEngineerLabel(task.customer?.profile) : EMPTY_VALUE_DASH}
                    </span>
                  </>
                )}
              </Box>
              <TicketChipStatus
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
