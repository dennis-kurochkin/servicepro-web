import { ReactNode } from 'react'
import avatarPicture from '@assets/avatar.png'
import { Tooltip } from '@components/Tooltip'
import { theme } from '@data/theme'
import { Person } from '@mui/icons-material'
import { Avatar, Box, Chip, SxProps, Typography } from '@mui/material'

const shortName = 'Иванов И.'
const fullName = 'Иванов Иван Александрович'

interface EngineerAvatarProps {
  labelled?: boolean
  sx?: SxProps
  renderAfterChip?: ReactNode
  onClick?: () => void
}

export const EngineerAvatar = ({ labelled = true, sx, renderAfterChip, onClick }: EngineerAvatarProps) => {
  const handleClick = () => {}

  const avatar = (
    <Avatar
      alt={fullName}
      src={Math.random() > 0.5 ? avatarPicture : undefined}
      sx={{
        width: `${labelled ? 20 : 32}px !important`,
        height: `${labelled ? 20 : 32}px !important`,
        border: labelled ? 'none' : undefined,
        cursor: 'pointer',
      }}
      onClick={() => !labelled && handleClick()}
    >
      <Box
        component={'span'}
        sx={{
          fontSize: labelled ? '12px' : '16px',
          fontWeight: 600,
          textTransform: 'uppercase',
        }}
      >
        <Person sx={{ fontSize: '1rem' }} />
      </Box>
    </Avatar>
  )

  return (
    <Tooltip
      placement={'left'}
      content={(
        <Box>
          <Typography variant={'body2'}>
            {fullName}{' '}
          </Typography>
        </Box>
      )}
    >
      <Box
        sx={{ position: 'relative', ...sx }}
      >
        {labelled ? (
          <Chip
            variant={'filled'}
            sx={{ height: '28px' }}
            avatar={avatar}
            label={(
              <>
                {shortName}
                <Typography
                  component={'span'}
                  variant={'body2'}
                  fontWeight={700}
                  color={theme.palette.success.main}
                  sx={{
                    marginLeft: '6px',
                  }}
                >
                  4.3
                </Typography>
              </>
            )}
            onClick={async (e) => {
              e.stopPropagation()
              onClick ? onClick() : handleClick()
            }}
          />
        ) : avatar}
        {renderAfterChip}
      </Box>
    </Tooltip>
  )
}
