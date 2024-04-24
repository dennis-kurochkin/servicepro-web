import { styled, tooltipClasses, TooltipProps as MUITooltipProps, Tooltip as MUITooltip, Box } from '@mui/material'

const LightTooltip = styled(({ className, ...props }: MUITooltipProps) => (
  <MUITooltip
    {...props}
    classes={{ popper: className }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[2],
  },
}))

interface TooltipProps extends Pick<MUITooltipProps, 'children' | 'placement'> {
  content: MUITooltipProps['title']
}

export const Tooltip = ({ content, children, placement = 'top' }: TooltipProps) => {
  return (
    <LightTooltip
      title={(
        <Box
          sx={{ padding: '4px' }}
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </Box>
      )}
      placement={placement}
      arrow
    >
      {children}
    </LightTooltip>
  )
}
