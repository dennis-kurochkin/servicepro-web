import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { useProfile } from '@hooks/useProfile'
import { Logout, Person, Settings } from '@mui/icons-material'
import { Avatar, Badge, Box, Button, Divider, ListItemIcon, MenuItem, Skeleton, Typography } from '@mui/material'
import { publicClient } from '~/api'
import { RoleEnum } from '~/api/servicepro.generated'
import ContextMenu from '~/features/common/components/ContextMenu'

const RoleEnumLabel: Record<RoleEnum, string> = {
  [RoleEnum.Client]: 'Клиент',
  [RoleEnum.Coordinator]: 'Координатор',
  [RoleEnum.Engineer]: 'Инженер',
}

export const HeaderProfileMenu = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { setAuth } = useAuth()
  const { employment } = useProfile()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const isUserMenuOpen = Boolean(anchorEl)

  const handleUserMenuClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignOutClick = async () => {
    try {
      await publicClient.api.accountJwtBlacklistCookieCreate({ withCredentials: true })
    } catch (error) {
      //
    } finally {
      setAuth({})
      navigate('/auth', { state: { from: location } })
    }
  }

  return (
    <>
      <Badge
        badgeContent={RoleEnumLabel[employment?.role ?? RoleEnum.Coordinator]}
        color="info"
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        overlap="circular"
        sx={{
          '& > [class*="badge"]': {
            left: '-52px',
            top: '16px',
          },
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
            src={employment?.profile?.photo ?? undefined}
            sx={{
              width: '32px',
              height: '32px',
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
              {!employment ? (
                <>
                  <Skeleton
                    variant={'text'}
                  />
                  <Skeleton
                    variant={'text'}
                  />
                </>
              ) : (
                <>
                  <Typography
                    variant={'body1'}
                  >
                    {employment.profile.first_name} {employment.profile.last_name}
                  </Typography>
                  <Typography
                    variant={'body2'}
                  >
                    {employment.profile.email}
                  </Typography>
                </>
              )}
            </Box>
            <Divider sx={{ marginBottom: '8px' }} />
          </Box>
          <MenuItem
            to={'/settings'}
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
