import { ReactNode } from 'react'
import { theme } from '@data/theme'
import { Person } from '@mui/icons-material'
import { Avatar, Box, Chip, SxProps, Typography } from '@mui/material'

interface EngineerAvatarProps {
  profile: {
    last_name?: string
    first_name?: string
    photo?: string | null
  }
  fullName?: string,
  labelled?: boolean
  sx?: SxProps
  renderAfterChip?: ReactNode
  onClick?: () => void
}

export const EngineerAvatar = ({ profile = {}, fullName = 'Без имени', labelled = true, sx, renderAfterChip, onClick }: EngineerAvatarProps) => {
  const handleClick = () => {}

  const avatar = (
    <Avatar
      alt={fullName}
      src={profile.photo ?? undefined}
      sx={{
        width: '24px !important',
        height: '24px !important',
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
    <Box
      sx={{ position: 'relative', ...sx }}
    >
      {labelled ? (
        <Chip
          variant={'filled'}
          sx={{
            height: '32px',
            borderRadius: '20px 8px 8px 20px',
            background: 'rgba(0, 0, 0, 0.06)',
          }}
          avatar={avatar}
          label={(
            <>
              {`${profile.last_name} ${profile.first_name?.[0]}.`}
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
  )
}
