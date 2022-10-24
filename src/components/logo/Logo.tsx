import {useHistory} from "react-router-dom";
import cx from "classnames";

import {AppTheme} from "../../types/types";
import './Logo.scss'
import {useMenuContext} from "../../contexts/MenuContext";

type Props = {
  theme?: AppTheme
}

const Logo = ({ theme = 'dark' }: Props) => {
  const navigate = useHistory()
  const { setCoverRunning } = useMenuContext()

  return (
    <div onClick={() => {
      setCoverRunning()

      setTimeout(() => {
        navigate.push('/')
      }, 500)
    }} className={cx('logo cursorLink', theme)}>
      <span>hue&</span>
      <span>machine</span>
    </div>
  )
}

export { Logo }
