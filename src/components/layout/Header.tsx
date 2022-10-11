import {Logo} from "../logo/Logo";
import {Burger} from "../burger/Burger";

import './Header.scss'
import {AppTheme} from "../../types/types";

type Props = {
  hasBurger: boolean
  theme?: AppTheme

}

const Header = ({ hasBurger, theme }: Props) => {
  const elementsTheme = theme === 'light' ? 'dark' : 'light'

  return (
    <div className='header'>
      <div className="wrapper">
        <Logo theme={elementsTheme} />
        {hasBurger ? <Burger theme={elementsTheme} /> : <div />}
      </div>
    </div>
  )
}

export { Header }