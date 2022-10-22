import {PropsWithChildren, useEffect} from 'react'
import cx from 'classnames'
import {Helmet} from "react-helmet";

import { AppTheme } from "../../types/types";
import {Menu} from "../menu/Menu";
import { Header } from './Header'
import { Footer } from './Footer'

import './DefaultLayout.scss'

type Props = {
  hasHeader?: boolean
  hasFooter?: boolean
  hasBurger?: boolean
  theme?: AppTheme
  className?: string;
  title?: string;
}

const DefaultLayout = ({ children, title = 'Hue&Machine', theme = 'dark', hasHeader = true, hasFooter = true, hasBurger = true, className }: PropsWithChildren<Props>) => {
  useEffect(() => window.scrollTo(0, 0), [])

  return (
    <div className={cx('app', theme, className)}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
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
