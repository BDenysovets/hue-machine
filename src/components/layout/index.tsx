import { FC } from 'react';
import { Header } from './Header';
import { Box, Container } from '@mui/material';
import Login from '../../pages/login';
import { useSession } from "next-auth/react"

const Content: FC = ({ children }) => (
  <Box>
    <Header />
    <Container maxWidth='lg' sx={{ paddingTop: 4 }}>
      {children}
    </Container>
  </Box>
);

const Layout: FC<{ hasAuth?: boolean }> = ({ hasAuth= false, children }) => {
  const { data: session } = useSession()

  // if (!session && hasAuth) return <Login />

  return <Content>{children}</Content>
};

export { Layout };
