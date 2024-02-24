import { ArrowDropDown } from '@mui/icons-material'
import { createTheme } from '@mui/material'
import { ruRU } from '@mui/material/locale'

export const defaultTheme = createTheme()

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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: `${defaultTheme.palette.grey['300']}`,
          },
          '&.Mui-disabled:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: `${defaultTheme.palette.grey['300']} !important`,
          },
          '& > fieldset': {
            borderColor: `${defaultTheme.palette.grey['200']}`,
          },
          '&:hover > fieldset': {
            borderColor: `${defaultTheme.palette.grey['300']} !important`,
          },
          '&.Mui-focused > fieldset': {
            borderColor: `${defaultTheme.palette.info.main} !important`,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#cccccc',
          padding: '6px 0px 6px 16px',
        },
        head: {
          paddingRight: '4px',
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
          margin: 0,
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
