import { Link } from "react-router-dom";
import cx from "classnames";

import {AppTheme} from "../../types/types";
import './Logo.scss'
import CursorLink from '../../assets/CursorLink.svg'

type Props = {
  theme?: AppTheme
}

const Logo = ({ theme = 'dark' }: Props) => (
  <div data-cursor-background-image={CursorLink} data-cursor-size="200px">
    <Link to='/' className={cx('logo', theme)}>
      <span>hue&</span>
      <span>machine</span>
    </Link>
  </div>
)

export { Logo }
