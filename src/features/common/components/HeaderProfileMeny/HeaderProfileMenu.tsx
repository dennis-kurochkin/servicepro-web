import React, {useState} from 'react'
import {Logout, Person, Settings} from '@mui/icons-material'
import {Avatar, Badge, Box, Button, Divider, ListItemIcon, MenuItem, Typography} from '@mui/material'
import ContextMenu from "~/features/common/components/ContextMenu";
import Link from 'next/link'
import {useRouter} from "next/navigation";
import {theme} from "~/features/common/components/ThemeRegistry/ThemeRegistry";

const HeaderProfileMenu = () => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const isUserMenuOpen = Boolean(anchorEl)

  const handleUserMenuClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignOutClick = async () => {
    router.push('/auth')
  }

  return (
    <>
    <Badge
      badgeContent={'Координатор'}
      color="info"
      anchorOrigin={{ horizontal: 'left', vertical: 'top', }}
      overlap="circular"
      sx={{
        '& > [class*="badge"]': {
          left: '-52px',
          top: '16px',
        }
      }}
    >
      <Button
        size={'small'}
        aria-controls={isUserMenuOpen ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isUserMenuOpen ? 'true' : undefined}
        sx={{ padding: 0, minWidth: 0 }}
        disableRipple
        onClick={handleUserMenuClick}
      >
        <Avatar
          id={'account-menu-avatar'}
          sx={{
            width: '32px',
            height: '32px',
            // backgroundColor: theme.palette.primary.light,
            boxShadow: 1,
          }}
        >
          <Person sx={{ fontSize: '20px' }} />
        </Avatar>
      </Button>
    </Badge>
      <ContextMenu
        id={'account-menu'}
        anchorEl={anchorEl}
        open={isUserMenuOpen}
        disableScrollLock
        onClose={handleClose}
        onClick={handleClose}
      >
        <Box
          sx={{
            width: '250px',
          }}
        >
          <Box>
            <Box
              sx={{
                padding: '0 20px 12px 12px',
              }}
            >
              <Typography
                variant={'body1'}
              >
                Иван Иванов
              </Typography>
              <Typography
                variant={'body2'}
              >
                test@test.ru
              </Typography>
            </Box>
            <Divider sx={{ marginBottom: '8px' }} />
          </Box>
          <MenuItem
            href={'/settings'}
            component={Link}
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Настройки
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleSignOutClick}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Выйти из системы
          </MenuItem>
        </Box>
      </ContextMenu>
    </>
  )
}

export default HeaderProfileMenu
