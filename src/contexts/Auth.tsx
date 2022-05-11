import {createContext, FC, useContext, useState} from 'react'

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
  isAuthenticated: () => boolean
  setToken: (token: string) => void
  logout: () => void
}

const defaultValue: UserContextProps = {
  token: null,
  user: { data: null, setUser: () => undefined },
  isAuthenticated: () => false,
  setToken: () => undefined,
  logout: () => undefined
}

const UserContext = createContext<UserContextProps>(defaultValue)

const UserProvider: FC = ({ children }) => {
  const [token, setToken] = useState<TokenT>()
  const [user, setUser] = useState<UserT>()

  function logout() {
    setUser(null)
    setToken(null)
  }

  function isAuthenticated() {
    return !!token && !!user
  }

  return (
    <UserContext.Provider value={{ token, setToken, isAuthenticated, logout, user: { data: user, setUser } }}>
      {children}
    </UserContext.Provider>
  )
}

export const useAuth: () => UserContextProps = () => useContext<UserContextProps>(UserContext)

export { UserProvider }
