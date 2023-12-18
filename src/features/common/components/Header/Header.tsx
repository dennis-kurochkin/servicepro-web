import { useLocation, useNavigate } from 'react-router-dom'
import logo from '@assets/logo.png'
import { HeaderProfileMenu } from '@components/HeaderProfileMenu'
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material'

export const headerHeight = 54

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
      position="fixed"
      elevation={0}
      sx={{
        zIndex: 1200,
        background: '#fff',
      }}
    >
      <Container
        maxWidth={'xl'}
      >
        <Toolbar
          variant={'dense'}
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr max-content 1fr',
            height: `${headerHeight}px`,
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
      </Container>
    </AppBar>
  )
}
