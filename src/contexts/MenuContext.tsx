import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import {useHistory} from "react-router-dom";

type DefaultValuesType = {
  isOpen?: boolean;
  openMenu?: () => void;
  closeMenu?: () => void;
  toggleMenu?: () => void;
  isMenuRunning?: boolean;
  isCoverRunning?: boolean;
  setMenuRunning?: () => void;
  setIsCoverRunning?: () => void;
  goToPage: (path: string) => void;
  cover: 'stable' | 'running' | 'ended'
}

const defaultValues: DefaultValuesType = {
  isOpen: false,
  openMenu: () => undefined,
  closeMenu: () => undefined,
  toggleMenu: () => undefined,
  goToPage: () => undefined,
  isMenuRunning: false,
  isCoverRunning: false,
  setMenuRunning: () => undefined,
  setIsCoverRunning: () => undefined,
  cover: 'stable'
}

const Context = createContext<DefaultValuesType>(defaultValues)

type UseMenuContextType = () => DefaultValuesType

const useMenuContext: UseMenuContextType = () => useContext(Context)

const MenuProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useHistory();
  const [isOpen, setIsOpen] = useState(defaultValues.isOpen)
  const [isMenuRunning, setIsMenuRunning] = useState(defaultValues.isMenuRunning)
  const [isCoverRunning, setIsCoverRunning] = useState(defaultValues.isMenuRunning)
  const [cover, setCover] = useState(defaultValues.cover)

  useEffect(() => {
    isMenuRunning && setTimeout(() => setIsMenuRunning(false), 1400)
  }, [isMenuRunning])

  useEffect(() => {
    isCoverRunning && setTimeout(() => {
      setIsCoverRunning(false)
      setCover('ended')
    }, 1400)
  }, [isCoverRunning])

  return (
    <Context.Provider
      value={{
        cover,
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
        },
        goToPage: (path: string) => {
          setIsCoverRunning(true)
          setCover('running')
          !isCoverRunning && navigate.push(path)
        }
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { MenuProvider, defaultValues, useMenuContext }
