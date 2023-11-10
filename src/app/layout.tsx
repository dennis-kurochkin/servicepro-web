import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './globals.css'
import 'leaflet/dist/leaflet.css'
import {Box} from "@mui/material";
import ThemeRegistry from "~/features/common/components/ThemeRegistry/ThemeRegistry";
import {grey} from "@mui/material/colors";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'СЕРВИСПРО',
  description: 'Описание',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <Box
            sx={{
              minHeight: '100vh',
              backgroundColor: grey['100'],
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  )
}
