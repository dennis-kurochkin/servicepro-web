import { ReactElement } from 'react'
import { Box, SxProps } from '@mui/material'
import { Placement } from '@popperjs/core'
import Tippy, { TippyProps } from '@tippyjs/react'

interface TooltipNewProps extends Pick<TippyProps, 'visible' | 'interactive'>{
  placement?: Placement
  strategy?: 'absolute' | 'fixed'
  content: string | ReactElement
  contentSx?: SxProps
  target: ReactElement
  targetSx?: SxProps
}

export const TooltipNew = ({ visible, strategy = 'absolute', interactive, placement, content, contentSx, target, targetSx }: TooltipNewProps) => {
  return (
    <>
      <Tippy
        theme={'light'}
        visible={visible}
        interactive={interactive}
        placement={placement}
        content={(
          <Box
            sx={{
              padding: '6px 10px',
              ...(contentSx ?? {}),
            }}
          >
            {content}
          </Box>
        )}
        popperOptions={{
          strategy: strategy,
        }}
      >
        <Box
          sx={targetSx}
        >
          {target}
        </Box>
      </Tippy>
    </>
  )
}
