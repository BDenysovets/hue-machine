import {FC, useEffect, useState} from 'react';
import { Header } from './Header';
import { Box, Container } from '@mui/material';
import Login from '../../pages/login';
import { useSession } from "next-auth/react"
import {find} from "../../lib/dato-cms";

const Content: FC = ({ children }) => (
  <Box>
    <Header />
    <Container maxWidth='lg' sx={{ paddingTop: 4 }}>
      {children}
    </Container>
  </Box>
);

const Layout: FC<{ hasAuth?: boolean }> = ({
  hasAuth= false,
  children,
}) => {
  const { data: session } = useSession()
  const [adminEmails, setAdminEmails] = useState<Array<string> | undefined>();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    find('rpmAdminUser')
      .then(data => data[0])
      .then(({ admin_email }) => setAdminEmails(admin_email.split(', ')))
  }, [])

  useEffect(() => {
    if (adminEmails) {
      setHasAccess(adminEmails.some(adminEmail => adminEmail === session?.user?.email))
    }
  }, [adminEmails, session])

  if (hasAuth) {
    if (!hasAccess) return <Login />

    return <Content>{children}</Content>
  }

  return <Content>{children}</Content>
};

export { Layout };
