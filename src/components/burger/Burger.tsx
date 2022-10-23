import './Burger.scss'
import {useMenuContext} from "../../contexts/MenuContext";
import cx from "classnames";
import {AppTheme} from "../../types/types";

type Props = {
  theme?: AppTheme
}

const Burger = ({ theme }: Props) => {
  const { isOpen, toggleMenu } = useMenuContext()

  return (
    <div className={cx('burger cursorLink', theme)} onClick={toggleMenu}>
      <div className="square">
        <div className="lines">
          <div className={cx("line", isOpen && 'open')} />
          <div className={cx("line", isOpen && 'open')} />
        </div>
      </div>
    </div>
  )
}

export { Burger }
