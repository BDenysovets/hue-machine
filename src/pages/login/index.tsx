import { FC } from 'react';
import { Stack, Typography, Button } from '@mui/material';
import {Logout as LogoutIcon, Login as LoginIcon} from '@mui/icons-material';
import {signIn, useSession, signOut} from "next-auth/react"

const Login: FC = () => {
  const { data: session } = useSession()

  return (
    <Stack
      justifyContent='center'
      alignItems='center'
      gap={2}
      sx={{
        height: 500
      }}
    >
      {session ? (
        <>
          <Typography variant={'h4'} align={'center'}>
            Click to Logout
          </Typography>
          <Button onClick={() => signOut()} variant={'contained'}>
            <Stack direction="row" spacing={1}>
              <span>Logout</span>
              <LogoutIcon />
            </Stack>
          </Button>
        </>
      ) : (
        <>
          <Typography variant={'h4'} align={'center'}>
            Please login with Google to proceed
          </Typography>
          <Button onClick={() => signIn()} variant={'contained'}>
            <Stack direction="row" spacing={1}>
              <span>Login</span>
              <LoginIcon />
            </Stack>
          </Button>
        </>
      )}
    </Stack>
  );
};

export default Login;
