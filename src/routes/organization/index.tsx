import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import logoVertical from '@assets/logo-vertical.png'
import { FooterCopyright } from '@components/FooterCopyright'
import { theme } from '@data/theme'
import { useProfile } from '@hooks/useProfile'
import {
  Alert,
  Avatar,
  Box,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from '@mui/material'

export const OrganizationRoute = () => {
  const navigate = useNavigate()
  const { query: { data: profile, isFetching, isSuccess }, setEmployment } = useProfile((data) => {
    if (data.employments.length === 1) {
      setEmployment(data.employments[0] ?? null)
      navigate(`/${data.employments[0].organization.id}/tickets`)
    }
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        paddingTop: '60px',
      }}
    >
      <img
        src={logoVertical}
        alt="СЕРВИСПРО"
        style={{ display: 'block' }}
        width={165}
        height={192}
      />
      <Box
        sx={{
          display: 'grid',
          width: '400px',
          borderRadius: 3,
          border: '1px solid',
          padding: '28px 28px 12px',
          mt: '32px',
          borderColor: theme.palette.grey['200'],
          background: theme.palette.common.white,
        }}
      >
        <Alert severity={'info'}>
          Выберите сервисный центр
        </Alert>
        {!isSuccess || isFetching ? (
          <Box
            sx={{
              display: 'grid',
              gap: '12px',
              mt: '20px',
            }}
          >
            <Skeleton
              variant="rounded"
              width={'100%'}
              height={60}
            />
            <Skeleton
              variant="rounded"
              width={'100%'}
              height={60}
            />
            <Skeleton
              variant="rounded"
              width={'100%'}
              height={60}
            />
          </Box>
        ) : (
          <List
            sx={{
              margin: '4px -28px 0',
            }}
          >
            {profile!.employments.map((employment, index) => (
              <Fragment key={`${employment.id}${index}`}>
                {index !== 0 && (
                  <Divider
                    variant="inset"
                    component="li"
                    sx={{
                      marginX: '16px',
                    }}
                  />
                )}
                <ListItemButton
                  sx={{
                    padding: '12px 28px',
                  }}
                  onClick={() => navigate('/tickets')}
                >
                  <ListItemAvatar
                    sx={{
                      minWidth: '60px',
                    }}
                  >
                    <Avatar
                      variant={'rounded'}
                      src={employment.organization.photo}
                      alt={employment.organization.name}
                      sx={{
                        width: '48px',
                        height: '48px',
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      m: 0,
                    }}
                    primary={employment.organization.name}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {employment.profile.position}
                        </Typography>
                        <span
                          style={{ display: 'block' }}
                        >
                          {employment.profile.phone_number}
                        </span>
                      </>
                    }
                  />
                </ListItemButton>
              </Fragment>
            ))}
          </List>
        )}

      </Box>
      <FooterCopyright />
    </Box>
  )
}
