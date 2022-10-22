import { Link } from "react-router-dom";
import cx from "classnames";

import {AppTheme} from "../../types/types";
import './Logo.scss'

type Props = {
  theme?: AppTheme
}

const Logo = ({ theme = 'dark' }: Props) => (
  <Link to='/' className={cx('logo', theme)}>
    <span>hue&</span>
    <span>machine</span>
  </Link>
)

export { Logo }
