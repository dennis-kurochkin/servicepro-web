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
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontSize: '0.95rem',
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
