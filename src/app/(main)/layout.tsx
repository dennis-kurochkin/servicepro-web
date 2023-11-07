import {Header} from "~/features/common/components/Header";
import {Container} from "@mui/material";

export default function Layout({children,}: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Container
        sx={{
          paddingTop: '24px',
          paddingBottom: '36px',
        }}
        maxWidth="xl"
      >
        {children}
      </Container>
    </>
  )
}
