import { ButtonIcon } from '@components/ButtonIcon'
import { MAP_ACTIONS_Z_INDEX } from '@constants/index'
import { getEngineerLabel } from '@features/engineers/helpers'
import { useOpenTicketDrawer } from '@features/tickets/hooks/useOpenTicketDrawer'
import { TaskVerbose } from '@features/tickets/types'
import { ChevronLeft, ChevronRight, Visibility } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

interface MapControlTicketsProps {
  selectedTask: TaskVerbose | null
  onSelectPrev: (() => void) | null
  onSelectNext: (() => void) | null
}

export const MapControlTickets = ({ selectedTask, onSelectNext, onSelectPrev }: MapControlTicketsProps) => {
  const { openTicketDrawer } = useOpenTicketDrawer()

  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: MAP_ACTIONS_Z_INDEX,
        bottom: '12px',
        left: '12px',
        display: 'flex',
        gap: '4px',
      }}
    >
      <Box
        sx={{
          background: (theme) => theme.palette.common.white,
          borderRadius: 1,
        }}
      >
        <ButtonIcon
          Icon={ChevronLeft}
          disabled={!onSelectPrev}
          disableElevation={false}
          onClick={onSelectPrev ?? (() => undefined)}
        />
      </Box>
      <Box
        sx={{
          background: (theme) => theme.palette.common.white,
          borderRadius: 1,
        }}
      >
        <ButtonIcon
          Icon={ChevronRight}
          disabled={!onSelectNext}
          disableElevation={false}
          onClick={onSelectNext ?? (() => undefined)}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '32px',
          paddingX: '8px',
          background: (theme) => theme.palette.common.white,
          borderRadius: 1,
          boxShadow: 2,
        }}
      >
        {selectedTask ? (
          <>
            <Typography
              component={'span'}
              variant={'body2'}
            >
              {selectedTask.task.title}
            </Typography>
            <Typography
              component={'span'}
              variant={'body2'}
              fontWeight={500}
              sx={{ marginLeft: '4px' }}
            >
              {getEngineerLabel(selectedTask.task.customer?.profile ?? {})}
            </Typography>
          </>
        ) : (
          <Typography
            variant={'body2'}
            sx={{ color: (theme) => theme.palette.grey['700'] }}
          >
            Задача не выбрана
          </Typography>
        )}
      </Box>
      {selectedTask?.task?.id && (
        <Box
          sx={{
            background: (theme) => theme.palette.common.white,
            borderRadius: 1,
          }}
        >
          <ButtonIcon
            Icon={Visibility}
            disableElevation={false}
            onClick={() => openTicketDrawer(selectedTask.task.id)}
          />
        </Box>
      )}
    </Box>
  )
}
