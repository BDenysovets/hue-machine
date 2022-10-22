import {createContext, ReactNode, useContext, useEffect, useState} from 'react'

type DefaultValuesType = {
  isOpen?: boolean;
  openMenu?: () => void;
  closeMenu?: () => void;
  toggleMenu?: () => void;
  isMenuRunning?: boolean;
  isCoverRunning?: boolean;
  setMenuRunning?: () => void;
  setCoverRunning: () => void;
}

const defaultValues: DefaultValuesType = {
  isOpen: false,
  openMenu: () => undefined,
  closeMenu: () => undefined,
  toggleMenu: () => undefined,
  isMenuRunning: false,
  isCoverRunning: false,
  setMenuRunning: () => undefined,
  setCoverRunning: () => undefined,
}

const Context = createContext<DefaultValuesType>(defaultValues)

type UseMenuContextType = () => DefaultValuesType

const useMenuContext: UseMenuContextType = () => useContext(Context)

const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(defaultValues.isOpen)
  const [isMenuRunning, setIsMenuRunning] = useState(defaultValues.isMenuRunning)
  const [isCoverRunning, setIsCoverRunning] = useState(defaultValues.isCoverRunning)

  useEffect(() => {
    isMenuRunning && setTimeout(() => setIsMenuRunning(false), 1400)
  }, [isMenuRunning])

  useEffect(() => {
    isCoverRunning && setTimeout(() => {
      setIsCoverRunning(false)
    }, 1400)
  }, [isCoverRunning])

  return (
    <Context.Provider
      value={{
        isOpen,
        isMenuRunning,
        isCoverRunning,
        setMenuRunning: () => setIsMenuRunning(true),
        setCoverRunning: () => setIsCoverRunning(true),
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
        },
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { MenuProvider, defaultValues, useMenuContext }
