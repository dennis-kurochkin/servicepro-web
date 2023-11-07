'use client'

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import React from "react";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";


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

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const Header = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClickNavButton = (url: string) => {
    router.push(url)
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: '#fff'
      }}
    >
      <Container maxWidth="xl">
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
            <Image
              src="/logo.png"
              alt="СЕРВИСПРО"
              style={{ display: 'block', }}
              width={200}
              height={32}
              priority
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
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
