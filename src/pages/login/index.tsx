import { FC } from 'react';
import { Stack, Typography } from '@mui/material';
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
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <>
          <Typography variant={'h4'} align={'center'}>
            Please login to proceed
          </Typography>
          <button onClick={() => signIn()}>Login</button>
        </>
      )}
    </Stack>
  );
};

export default Login;
