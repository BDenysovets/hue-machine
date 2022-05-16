import { FC } from 'react';
import { Header } from './Header';
import { Box, Container } from '@mui/material';
import { useAuth } from '../../contexts/Auth';
import Login from '../../pages/login';

const Content: FC = ({ children }) => (
  <Box>
    <Header />
    <Container maxWidth='lg' sx={{ paddingTop: 4 }}>
      {children}
    </Container>
  </Box>
);

const Layout: FC = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated() ? <Content>{children}</Content> : <Login />;
};

export { Layout };
