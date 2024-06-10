import { ReactNode } from 'react'
import { theme } from '@data/theme'
import { getEngineerLabel } from '@features/engineers/helpers'
import { Person, PersonOff } from '@mui/icons-material'
import { Avatar, Box, Chip, SxProps, Typography } from '@mui/material'

interface EngineerAvatarProps {
  profile: null | {
    last_name?: string
    first_name?: string
    photo?: string | null
  }
  fullName?: string,
  labelled?: boolean
  emptyLabel?: string
  sx?: SxProps
  renderAfterChip?: ReactNode
  onClick?: () => void
}

export const EngineerAvatar = ({ profile = {}, fullName = 'Без имени', emptyLabel = 'Не назначен', labelled = true, sx, renderAfterChip, onClick }: EngineerAvatarProps) => {
  const avatar = (
    <Avatar
      alt={fullName}
      src={profile?.photo ?? undefined}
      sx={{
        width: '24px !important',
        height: '24px !important',
        border: labelled ? 'none' : undefined,
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <Box
        component={'span'}
        sx={{
          fontSize: labelled ? '12px' : '16px',
          fontWeight: 600,
          textTransform: 'uppercase',
        }}
      >
        {profile ? <Person sx={{ fontSize: '1rem' }} /> : (
          <PersonOff
            sx={{
              marginBottom: '-2px',
              fontSize: '20px',
            }}
          />
        )}
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
              {profile ? getEngineerLabel(profile) : emptyLabel}
              {profile && (
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
              )}
            </>
          )}
          onClick={onClick ? async (e) => {
            e.stopPropagation()
            onClick()
          } : undefined}
        />
      ) : avatar}
      {renderAfterChip}
    </Box>
  )
}
