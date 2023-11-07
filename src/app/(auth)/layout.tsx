
import {Box, Container, createTheme, ThemeProvider} from "@mui/material";

export default function LayoutAuth({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container
      maxWidth="xl"
    >
      {children}
    </Container>
  )
}
