import { FC } from 'react'
import { GoogleLoginResponse, GoogleLogin } from 'react-google-login';
import {useAuth} from "../../../contexts/Auth";
import {Stack, Typography} from "@mui/material";

const Login: FC = () => {
  const { setToken, user: { setUser } } = useAuth()
  const clientId = process.env.GOOGLE_CLIENT_ID ?? ''

  const handleResponse = (response: GoogleLoginResponse) => {
    setUser(response.profileObj)
    setToken(response.tokenId)
  }

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      gap={2}
      sx={{
        height: 500
      }}
    >
      <Typography variant={'h4'} align={'center'} >Please login to proceed</Typography>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={handleResponse}
        onFailure={handleResponse}
        cookiePolicy={'single_host_origin'}
      />
    </Stack>
  )
}

export { Login }
