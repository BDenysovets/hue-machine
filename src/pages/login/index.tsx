import { FC } from 'react';
import { Stack, Typography, Button } from '@mui/material';
import {Logout as LogoutIcon, Login as LoginIcon} from '@mui/icons-material';
import {signIn, useSession, signOut} from "next-auth/react"
import {Layout} from "../../components/layout";

type Props = {
  type?: 'login' | 'logout'
}

const Login: FC<Props> = ({ type = 'logout' }) => {
  const { data: session } = useSession();
  const hasSession = type ? type === 'logout' : session;

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
          {hasSession ? 'Click to Logout' : 'Please login with Google to proceed'}
        </Typography>
        <Button onClick={() => hasSession ? signOut() : signIn()} variant={'contained'}>
          <Stack direction="row" spacing={1}>
            <span>{hasSession ? 'Logout' : 'Login'}</span>
            {hasSession ? <LogoutIcon /> : <LoginIcon />}
          </Stack>
        </Button>
      </Stack>
    </Layout>
  );
};

export default Login;
