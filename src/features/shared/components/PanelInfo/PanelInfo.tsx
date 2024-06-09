import { LabelValue } from '@features/shared/types'
import { Box, CircularProgress, Skeleton, SxProps, Typography } from '@mui/material'

interface PanelInfoProps {
  info: LabelValue[]
  icon?: string
  labelWidth?: number
  sx?: SxProps
  isFetching: boolean
}

export const PanelInfo = ({ info, icon, labelWidth = 150, sx, isFetching }: PanelInfoProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        ...(!icon ? {} : { gridTemplateColumns: '150px 1fr' }),
        gap: '32px',
        minWidth: '700px',
        padding: '24px 48px 24px 24px',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: (theme) => theme.palette.grey['300'],
        background: (theme) => theme.palette.grey['100'],
        ...(sx ?? {}),
      }}
    >
      {typeof icon === 'string' && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            objectFit: 'contain',
          }}
        >
          {isFetching ? (
            <CircularProgress />
          ) : (
            <img
              src={icon}
              alt={''}
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          )}
        </Box>
      )}
      <Box
        sx={{
          display: 'grid',
          gap: '4px',
        }}
      >
        {info.map(({ label, value }, index) => (
          <Box
            key={index}
            sx={{
              display: 'grid',
              alignItems: 'center',
              gridTemplateColumns: `${labelWidth}px 1fr`,
              gap: '16px',
            }}
          >
            <Typography
              variant={'body1'}
              sx={{ color: (theme) => theme.palette.grey['700'] }}
            >
              {label}
            </Typography>
            {isFetching ? (
              <Skeleton
                variant={'rounded'}
                height={20}
              />
            ) : (
              <Typography
                variant={'body1'}
              >
                {value}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
