import { ArrowDropDown } from '@mui/icons-material'
import { createTheme } from '@mui/material'
import { ruRU } from '@mui/material/locale'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ED1C24',
      dark: '#da181f',
    },
    secondary: {
      main: '#A0A0A0',
    },
    grey: {
      '300': '#cccccc',
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#cccccc',
        },
        head: {
          fontSize: '0.95rem',
        },
      },
    },
    MuiTableSortLabel: {
      defaultProps: {
        IconComponent: ArrowDropDown,
      },
      styleOverrides: {
        root: {
          marginTop: '-2px',
        },
        icon: {
          fontSize: '24px',
        },
      },
    },
  },
  typography: {
    fontFamily: [
      'TTLakesNeue',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
}, ruRU)
