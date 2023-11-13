import { useLocation, useNavigate } from 'react-router-dom'
import logo from '@assets/logo.png'
import { HeaderProfileMenu } from '@components/HeaderProfileMenu'
import { AppBar, Box, Button, Toolbar } from '@mui/material'

const pages = [
  {
    title: 'Заявки',
    url: '/tickets',
  },
  {
    title: 'Техника',
    url: '/vehicles',
  },
  {
    title: 'Инженеры',
    url: '/engineers',
  },
  {
    title: 'Клиенты',
    url: '/clients',
  },
  {
    title: 'Отчеты',
    url: '/reports',
  },
]

export const Header = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleClickNavButton = (url: string) => {
    navigate(url)
  }

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        position: 'relative',
        zIndex: 1000,
        background: '#fff',
        boxShadow: '0 0 8px 0 rgba(0,0,0,.1) !important',
      }}
    >
      <Box
        sx={{
          paddingX: '24px',
        }}
      >
        <Toolbar
          variant={'dense'}
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr max-content 1fr',
            height: '60px',
          }}
          disableGutters
        >
          <Box>
            <img
              src={logo}
              alt="СЕРВИСПРО"
              style={{ display: 'block' }}
              width={200}
              height={32}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '4px',
            }}
          >
            {pages.map(({ title, url }) => (
              <Button
                key={url}
                variant={pathname === url ? 'contained' : 'text'}
                sx={{
                  display: 'block',
                  paddingX: '16px',
                  pointerEvents: pathname === url ? 'none' : undefined,
                }}
                disableElevation
                onClick={() => handleClickNavButton(url)}
              >
                {title}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              ml: 'auto',
            }}
          >
            <HeaderProfileMenu />
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  )
}
