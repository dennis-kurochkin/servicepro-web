import React, { ReactNode } from 'react'
import { Menu, MenuListProps, MenuProps } from '@mui/material'

type PickedMenuListProps = Pick<MenuListProps, 'dense'>
type PickedMenuProps = Pick<MenuProps, 'id' | 'anchorEl' | 'open' | 'disableScrollLock' | 'onClose' | 'onClick'>

interface ContextMenuProps extends PickedMenuProps, PickedMenuListProps {
  children: ReactNode
}

const ContextMenu = ({ id, anchorEl, open, dense, disableScrollLock, children, onClose, onClick }: ContextMenuProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      id={id}
      open={open}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          transform: 'translateX(10px) !important',
          pointerEvents: 'all',
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 18,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      MenuListProps={{
        dense,
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      disableScrollLock={disableScrollLock}
      keepMounted
      hideBackdrop
      onClose={onClose}
      onClick={onClick}
    >
      {children}
    </Menu>
  )
}

export default ContextMenu
