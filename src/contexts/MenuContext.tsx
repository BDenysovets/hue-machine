import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from 'react'

type DefaultValuesType = {
  isOpen?: boolean;
  openMenu?: () => void;
  closeMenu?: () => void;
  toggleMenu?: () => void;
  isMenuRunning?: boolean;
  isCoverRunning?: boolean;
  setMenuRunning?: () => void;
  setCoverRunning: () => void;
  hasBurger?: boolean;
  setHasBurger: Dispatch<SetStateAction<boolean | undefined>>
}

const defaultValues: DefaultValuesType = {
  isOpen: false,
  openMenu: () => undefined,
  closeMenu: () => undefined,
  toggleMenu: () => undefined,
  isMenuRunning: false,
  isCoverRunning: false,
  setMenuRunning: () => undefined,
  hasBurger: true,
  setHasBurger: () => undefined,
  setCoverRunning: () => undefined,
}

const Context = createContext<DefaultValuesType>(defaultValues)

type UseMenuContextType = () => DefaultValuesType

const useMenuContext: UseMenuContextType = () => useContext(Context)

const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(defaultValues.isOpen)
  const [hasBurger, setHasBurger] = useState(defaultValues.hasBurger)
  const [isMenuRunning, setIsMenuRunning] = useState(defaultValues.isMenuRunning)
  const [isCoverRunning, setIsCoverRunning] = useState(defaultValues.isCoverRunning)

  useEffect(() => {
    if (isOpen) {
      document?.querySelector('body')?.classList.remove('dark')
      document?.querySelector('body')?.classList.add('light')
    }
  }, [isOpen])

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
        hasBurger,
        setHasBurger,
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
