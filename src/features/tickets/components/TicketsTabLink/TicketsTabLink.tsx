import { theme } from '@data/theme'
import { TicketsTab } from '@features/tickets/data'
import { Button, Link } from '@mui/material'

const TicketsTabLabel: Record<TicketsTab, string> = {
  [TicketsTab.Active]: 'активные',
  [TicketsTab.History]: 'история',
}

interface TicketsTabLinkProps {
  tab: TicketsTab
  activeTab: TicketsTab
  onClick: (tab: TicketsTab) => void
}

export const TicketsTabLink = ({ tab, activeTab, onClick }: TicketsTabLinkProps) => {
  return (
    <Link
      component={Button}
      sx={{
        padding: 0,
        textTransform: 'none',
        verticalAlign: 'baseline',
        '&:hover': {
          textDecoration: activeTab !== tab ? 'underline' : undefined,
          background: 'none',
        },
      }}
      color={activeTab === tab ? theme.palette.primary.main : theme.palette.text.primary}
      disableRipple
      onClick={() => onClick(tab)}
    >
      {TicketsTabLabel[tab]}
    </Link>
  )
}
