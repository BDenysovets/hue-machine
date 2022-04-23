import { FC } from 'react'
import { GoogleLoginResponse, GoogleLogin } from 'react-google-login';
import {useAuth} from "../../contexts/Auth";

const Login: FC = () => {
  const { setToken, user: { setUser } } = useAuth()
  const clientId = process.env.GOOGLE_CLIENT_ID ?? ''

  const handleResponse = (response: GoogleLoginResponse) => {
    setUser(response.profileObj)
    setToken(response.tokenId)
  }

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login"
      onSuccess={handleResponse}
      onFailure={handleResponse}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export { Login }
