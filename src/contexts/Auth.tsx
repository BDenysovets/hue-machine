import { createContext, FC, ReactNode, useContext, useState } from 'react'

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
  setToken: (token: string) => void
}

const defaultValue: UserContextProps = {
  token: null,
  user: { data: null, setUser: () => undefined },
  setToken: () => undefined,
}

const UserContext = createContext<UserContextProps>(defaultValue)

// TODO check Fc on children prop
const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<TokenT>()
  const [user, setUser] = useState<UserT>()

  return (
    <UserContext.Provider value={{ token, setToken, user: { data: user, setUser } }}>
      {children}
    </UserContext.Provider>
  )
}

/**
 * Hook provides access to user entity (if authorized), token header value and login method (if unauthorized)
 */
export const useAuth: () => UserContextProps = () => useContext<UserContextProps>(UserContext)

export { UserProvider }
