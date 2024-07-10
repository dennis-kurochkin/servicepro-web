import { useState } from 'react'
import { ButtonIcon } from '@components/ButtonIcon'
import { FieldAutocomplete } from '@components/Field'
import { Tooltip } from '@components/Tooltip'
import { MAP_ACTIONS_Z_INDEX } from '@constants/index'
import { ticketMapUpdateTimeOptions } from '@features/tickets/data'
import { Done, Update } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { useMapStore } from '~/store/map'

export const MapControlUpdateTime = () => {
  const [open, setOpen] = useState(false)
  const updateTime = useMapStore((state) => state.updateTime)
  const setUpdateTime = useMapStore((state) => state.setUpdateTime)

  const handleSelectUpdateTime = () => {
    setOpen(false)
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: MAP_ACTIONS_Z_INDEX,
        right: '12px',
        bottom: '62px',
      }}
    >
      <Tooltip
        visible={open}
        strategy={'fixed'}
        placement={'left'}
        maxWidth={280}
        contentSx={{
          width: '280px',
          padding: 0,
        }}
        content={(
          <Box
            sx={{
              display: 'flex',
              gap: '4px',
              alignItems: 'flex-end',
              padding: '10px',
              cursor: 'default',
            }}
          >
            <FieldAutocomplete
              label={'Частота обновления'}
              value={ticketMapUpdateTimeOptions.find(({ value }) => value === updateTime) ?? null}
              options={ticketMapUpdateTimeOptions}
              name={'duration'}
              sx={{ flexGrow: 1 }}
              disableClearable
              onChange={(option) => setUpdateTime(option?.value as '1')}
            />
            <ButtonIcon
              size={600}
              Icon={Done}
              onClick={handleSelectUpdateTime}
            />
          </Box>
        )}
        target={(
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '44px',
              width: '44px',
              borderRadius: '4px',
              boxShadow: 3,
              cursor: 'pointer',
              background: (theme) => theme.palette.background.paper,
              '&:hover': {
                background: (theme) => theme.palette.grey['100'],
              },
            }}
            onClick={() => setOpen((state) => !state)}
          >
            <Update
              sx={{
                color: (theme) => theme.palette.grey['800'],
              }}
            />
            <Typography
              variant={'body2'}
              sx={{
                marginTop: '-3px',
                fontSize: '12px',
                color: (theme) => theme.palette.grey['800'],
              }}
            >
              {ticketMapUpdateTimeOptions.find(({ value }) => value === updateTime)?.label.split(' ')[0]}
              {ticketMapUpdateTimeOptions.find(({ value }) => value === updateTime)?.label.split(' ')[1][0]}
            </Typography>
          </Box>
        )}
        interactive
      />
    </Box>
  )
}
