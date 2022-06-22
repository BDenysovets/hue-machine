import { FC } from 'react';
import { Stack, Typography, Button } from '@mui/material';
import {Logout as LogoutIcon, Login as LoginIcon} from '@mui/icons-material';
import {signIn, useSession, signOut} from "next-auth/react"
import {Layout} from "../../components/layout";

const Login: FC = () => {
  const { data: session } = useSession()

  return (
    <Layout>
      <Stack
        justifyContent='center'
        alignItems='center'
        gap={2}
        sx={{
          height: 500
        }}
      >
        <Typography variant={'h4'} align={'center'}>
          {session ? 'Click to Logout' : 'Please login with Google to proceed'}
        </Typography>
        <Button onClick={() => session ? signOut() : signIn()} variant={'contained'}>
          <Stack direction="row" spacing={1}>
            <span>{session ? 'Logout' : 'Login'}</span>
            {session ? <LogoutIcon /> : <LoginIcon />}
          </Stack>
        </Button>
      </Stack>
    </Layout>
  );
};

export default Login;
