import './Menu.scss'
import {useMenuContext} from "../../contexts/MenuContext";
import cx from "classnames";

const Cover = () => {
  const { isMenuRunning } = useMenuContext();

  return (
    <div className={cx('menuCover', isMenuRunning && 'running')} />
  )
}

const MenuContent = () => {
  const { isMenuRunning, isOpen } = useMenuContext();

  return (
    <div className={cx('menu', { 'open': isOpen, 'closing': !isOpen && isMenuRunning })}></div>
  )
}

const Menu = () => (
  <>
    <Cover />
    <MenuContent />
  </>
)

export { Menu }
