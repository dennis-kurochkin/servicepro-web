import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { OrganizationInfoDrawerContent } from '@features/organization/components/OrganizationInfoDrawerContent'
import ContextMenu from '@features/ui/components/ContextMenu'
import { useProfile } from '@hooks/useProfile'
import { useSignOut } from '@hooks/useSignOut'
import { BusinessCenter, Info, Logout, Person, Settings } from '@mui/icons-material'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  ListItemIcon,
  MenuItem,
  Skeleton,
  Typography,
} from '@mui/material'
import { RoleEnum } from '~/api/servicepro.generated'

const RoleEnumLabel: Record<RoleEnum, string> = {
  [RoleEnum.Client]: 'Клиент',
  [RoleEnum.Coordinator]: 'Координатор',
  [RoleEnum.Engineer]: 'Инженер',
  [RoleEnum.Server]: 'Сервер',
}

export const HeaderProfileMenu = () => {
  const { employment } = useProfile()
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const isUserMenuOpen = Boolean(anchorEl)
  const { signOut } = useSignOut()

  const handleUserMenuClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
                  {employment.organization && (
                    <Chip
                      label={employment.organization.name}
                      color={'default'}
                      variant={'outlined'}
                      size={'medium'}
                      avatar={(
                        <Avatar
                          variant={'rounded'}
                          sx={{ background: 'none' }}
                          src={employment.organization.photo + 'f'}
                        >
                          <BusinessCenter
                            fontSize={'small'}
                          />
                        </Avatar>
                      )}
                      deleteIcon={(
                        <Info
                          sx={{
                            marginLeft: 'auto !important',
                          }}
                        />
                      )}
                      sx={{
                        width: '100%',
                        marginTop: '12px',
                        padding: '6px 2px 6px 4px',
                        height: 'auto',
                        gap: '0px',
                        justifyContent: 'flex-start',
                        borderRadius: '8px',
                      }}
                      onDelete={() => setOpen(true)}
                      onClick={() => setOpen(true)}
                    />
                  )}
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
          <MenuItem onClick={signOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Выйти из системы
          </MenuItem>
        </Box>
      </ContextMenu>
      <Drawer
        open={open}
        anchor={'right'}
        onClose={() => setOpen(false)}
      >
        <OrganizationInfoDrawerContent onClose={() => setOpen(false)} />
      </Drawer>
    </>
  )
}
