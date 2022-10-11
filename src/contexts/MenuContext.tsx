import {createContext, ReactNode, useContext, useState} from 'react'

type DefaultValuesType = {
  isOpen?: boolean;
  openMenu?: () => void;
  closeMenu?: () => void;
  toggleMenu?: () => void;
}

const defaultValues: DefaultValuesType = {
  isOpen: false,
  openMenu: () => undefined,
  closeMenu: () => undefined,
  toggleMenu: () => undefined,
}

const Context = createContext<DefaultValuesType>(defaultValues)

type UseMenuContextType = () => DefaultValuesType

const useMenuContext: UseMenuContextType = () => useContext(Context)

const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(defaultValues.isOpen)

  return (
    <Context.Provider
      value={{
        isOpen,
        openMenu: () => setIsOpen(true),
        closeMenu: () => setIsOpen(false),
        toggleMenu: () => setIsOpen(prevState => !prevState)
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { MenuProvider, defaultValues, useMenuContext }
