import {createContext, ReactNode, useContext, useEffect, useState} from 'react'

type DefaultValuesType = {
  isOpen?: boolean;
  openMenu?: () => void;
  closeMenu?: () => void;
  toggleMenu?: () => void;
  isMenuRunning?: boolean;
  setMenuRunning?: () => void;
}

const defaultValues: DefaultValuesType = {
  isOpen: false,
  openMenu: () => undefined,
  closeMenu: () => undefined,
  toggleMenu: () => undefined,
  isMenuRunning: false,
  setMenuRunning: () => undefined,
}

const Context = createContext<DefaultValuesType>(defaultValues)

type UseMenuContextType = () => DefaultValuesType

const useMenuContext: UseMenuContextType = () => useContext(Context)

const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(defaultValues.isOpen)
  const [isMenuRunning, setIsMenuRunning] = useState(defaultValues.isMenuRunning)

  useEffect(() => {
    isMenuRunning && setTimeout(() => setIsMenuRunning(false), 1400)
  }, [isMenuRunning])

  return (
    <Context.Provider
      value={{
        isOpen,
        isMenuRunning,
        setMenuRunning: () => setIsMenuRunning(true),
        openMenu: () => {
          setIsMenuRunning(true)
          !isMenuRunning && setIsOpen(true)
        },
        closeMenu: () => {
          setIsMenuRunning(true)
          !isMenuRunning && setIsOpen(false)
        },
        toggleMenu: () => {
          setIsMenuRunning(true)
          !isMenuRunning && setIsOpen(prevState => !prevState)
        }
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { MenuProvider, defaultValues, useMenuContext }
