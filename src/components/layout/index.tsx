import {FC, useEffect, useState} from 'react';
import { Box, Container } from '@mui/material';
import {signOut, useSession} from "next-auth/react"

import Login from '../../pages/login';
import {find} from "../../lib/dato-cms";

import { Header } from './Header';
import {MessageT, Toast} from "../toast";

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
  const [message, setMessage] = useState<MessageT>(null)

  useEffect(() => {
    find('rpmAdminUser')
      .then(data => data[0])
      .then(({ admin_email }) => setAdminEmails(admin_email.split(', ')))
  }, [])

  useEffect(() => {
    if (adminEmails) {
      const isValidUser = adminEmails.some(adminEmail => adminEmail === session?.user?.email)

      if (isValidUser) {
        setHasAccess(isValidUser)
      } else {
        signOut().then(() => {
          setMessage({ text: "Please make sure, you have admin access email", type: 'error'});
        })
      }
    }
  }, [adminEmails, session])

  if (hasAuth) {
    if (!hasAccess) return <Login />

    return (
      <Content>
        {children}
        <Toast open={!!message} onClose={() => setMessage(null)} message={message}/>
      </Content>
    )
  }

  return <Content>{children}</Content>
};

export { Layout };
