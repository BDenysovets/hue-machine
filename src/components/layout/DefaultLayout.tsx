import { PropsWithChildren } from 'react'
import cx from 'classnames'

import { AppTheme } from "../../types/types";
import { Header } from './Header'
import { Footer } from './Footer'

import './DefaultLayout.scss'

type Props = {
  hasHeader?: boolean
  hasFooter?: boolean
  hasBurger?: boolean
  theme?: AppTheme
  className?: string;
}

const DefaultLayout = ({ children, theme = 'dark', hasHeader = true, hasFooter = true, hasBurger = true, className }: PropsWithChildren<Props>) => {
  return (
    <div className={cx('app', theme, className)}>
      {hasHeader && <Header hasBurger={hasBurger} theme={theme} />}
      <div>
        {children}
      </div>
      {hasFooter && <Footer />}
    </div>
  )
}

export { DefaultLayout }
