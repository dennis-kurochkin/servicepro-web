import { Fragment } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import logoVertical from '@assets/logo-vertical.png'
import { FooterCopyright } from '@components/FooterCopyright'
import { theme } from '@data/theme'
import { useApi } from '@hooks/useApi'
import { useAuth } from '@hooks/useAuth'
import {
  Alert,
  Avatar,
  Box,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton, Typography,
} from '@mui/material'

export const OrganizationRoute = () => {
  const { api } = useApi()
  const { setEmployment } = useAuth()
  const navigate = useNavigate()
  const query = useQuery(['my'], async () => {
    const { data } = await api.orgMyRetrieve()
    return data
  }, {
    onSuccess: (data) => {
      if (data.employments.length === 1) {
        setEmployment(data.employments[0] ?? null)
        localStorage.setItem('employmentID', data.employments[0].id.toString())
        navigate(`/${data.employments[0].id}/tickets`)
      }
    },
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        paddingTop: '100px',
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
        {query.isLoading ? (
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
            {query.data?.employments.map((employment, index) => (
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
                  onClick={() => {}}
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
                        <div>
                          {employment.profile.phone_number}
                        </div>
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
