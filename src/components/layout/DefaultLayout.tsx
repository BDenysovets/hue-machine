import {PropsWithChildren, useEffect} from 'react'
import cx from 'classnames'
import {Helmet} from "react-helmet";

import { AppTheme } from "../../types/types";
import {useMenuContext} from "../../contexts/MenuContext";
import {Menu} from "../menu/Menu";
import { Footer } from './Footer'

import './DefaultLayout.scss'
import {useLocation} from "react-router-dom";

type Props = {
  hasFooter?: boolean
  hasBurger?: boolean
  theme?: AppTheme
  className?: string;
  title?: string;
}

const DefaultLayout = ({ children, title = 'Hue&Machine', theme = 'dark', hasFooter = true, className }: PropsWithChildren<Props>) => {
  const { isOpen, isMenuRunning } = useMenuContext()
  const { pathname } = useLocation()

  useEffect(() => window.scrollTo(0, 0), [])
  useEffect(() => {
    if (theme === 'dark') {
      document?.querySelector('body')?.classList.add('dark')
      document?.querySelector('body')?.classList.remove('light')
    } else {
      document?.querySelector('body')?.classList.remove('dark')
      document?.querySelector('body')?.classList.add('light')
    }
  }, [theme, isOpen])

  useEffect(() => {
    const parallaxImagesContainer: NodeListOf<HTMLDivElement> = document.querySelectorAll('.parallaxImageCard')

    parallaxImagesContainer.forEach((imageContainer) => {
      const image: HTMLImageElement | null = imageContainer.querySelector('.react-parallax-bgimage')

      if (image) {
        image.onload = () => {
          imageContainer.classList.add('loaded')
        }
      }
    })
  }, [pathname])

  return (
    <div className={cx('app', theme, className, { 'menuOpen': isOpen && !isMenuRunning })}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className='appWrapper'>
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
