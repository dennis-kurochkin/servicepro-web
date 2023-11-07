'use client';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme} from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ED1C24',
    },
    secondary: {
      main: '#A0A0A0'
    },
  },
});


export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
  );
}
