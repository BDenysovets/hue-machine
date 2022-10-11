import { Link } from "react-router-dom";

import './Logo.scss'
import {AppTheme} from "../../types/types";
import cx from "classnames";

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
