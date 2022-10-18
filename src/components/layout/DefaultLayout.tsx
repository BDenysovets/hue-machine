import {PropsWithChildren, useEffect} from 'react'
import cx from 'classnames'

import { AppTheme } from "../../types/types";
import {Menu} from "../menu/Menu";
import { Header } from './Header'
import { Footer } from './Footer'

import './DefaultLayout.scss'
import {useMenuContext} from "../../contexts/MenuContext";

type Props = {
  hasHeader?: boolean
  hasFooter?: boolean
  hasBurger?: boolean
  theme?: AppTheme
  className?: string;
}

const DefaultLayout = ({ children, theme = 'dark', hasHeader = true, hasFooter = true, hasBurger = true, className }: PropsWithChildren<Props>) => {
  const { isOpen } = useMenuContext();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={cx('app', theme, className)} style={isOpen ? { overflow: 'hidden', maxHeight: '100vh', height: '100vh' } : undefined}>
      <div className='appWrapper'>
        {hasHeader && <Header hasBurger={hasBurger} theme={theme} />}
        <Menu />
        <div className="appPageContent">
          {children}
        </div>
        {hasFooter && <Footer theme={theme} />}
      </div>
    </div>
  )
}

export { DefaultLayout }
