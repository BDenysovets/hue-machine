import {Logo} from "../logo/Logo";
import {Burger} from "../burger/Burger";

import './Header.scss'
import {AppTheme} from "../../types/types";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import cx from "classnames";
import {useMenuContext} from "../../contexts/MenuContext";

type Props = {
  hasBurger: boolean
  theme?: AppTheme
}

const Header = ({ hasBurger, theme }: Props) => {
  const elementsTheme = theme === 'light' ? 'dark' : 'light'
  const { isOpen, isMenuRunning } = useMenuContext();
  const { pathname } = useLocation();
  const hasHeaderLink = useMemo(() => !pathname.includes('contacts'),[pathname])
  const [isGetInTouchVisible, setIsGetInTouchVisible] = useState(false);

  const handleScroll = () => setIsGetInTouchVisible(window.scrollY > 500);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='header'>
      <div className="wrapper">
        <div style={{ transition: isOpen && isMenuRunning ? 'opacity 0.3s' : 'initial', opacity: !isOpen ? 1 : 0, visibility: !isOpen && !isMenuRunning ? 'visible' : 'hidden' }}>
          <Logo theme={elementsTheme} />
        </div>
        <div className="headerActions">
          {hasHeaderLink && !isOpen && !isMenuRunning && <Link to="/contacts" className={cx(elementsTheme, isGetInTouchVisible && 'visible')}>Get in touch</Link>}
          {hasBurger ? <Burger theme={elementsTheme} /> : <div />}
        </div>
      </div>
    </div>
  )
}

export { Header }