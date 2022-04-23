import {createContext, FC, useContext, useEffect, useState} from 'react'

type TokenT = string | null | undefined

type UserT = {
  email: string
  familyName: string
  givenName: string
  googleId: string
  imageUrl: string
  name: string
}

type UserContextProps = {
  token: TokenT
  user: { data: UserT | null, setUser: (data: UserT) => void }
  authenticated: boolean
  setToken: (token: string) => void
  logout: () => void
}

const defaultValue: UserContextProps = {
  token: null,
  user: { data: null, setUser: () => undefined },
  authenticated: false,
  setToken: () => undefined,
  logout: () => undefined
}

const UserContext = createContext<UserContextProps>(defaultValue)

const UserProvider: FC = ({ children }) => {
  const [token, setToken] = useState<TokenT>()
  const [user, setUser] = useState<UserT>()
  const [authenticated, setAuthenticated] = useState(false)

  function logout() {
    setUser(null)
    setToken(null)
  }

  useEffect(() => setAuthenticated(!!token && !!user), [user, token])

  return (
    <UserContext.Provider value={{ token, setToken, authenticated, logout, user: { data: user, setUser } }}>
      {children}
    </UserContext.Provider>
  )
}

export const useAuth: () => UserContextProps = () => useContext<UserContextProps>(UserContext)

export { UserProvider }
