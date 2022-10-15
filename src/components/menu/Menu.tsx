import './Menu.scss'
import {useMenuContext} from "../../contexts/MenuContext";
import cx from "classnames";

const Menu = () => {
  const { isOpen } = useMenuContext();

  return (
    <div className={cx('menu', { 'open': isOpen })}>

    </div>
  )
}

export { Menu }
