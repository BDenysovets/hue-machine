import './Menu.scss'
import {useMenuContext} from "../../contexts/MenuContext";
import cx from "classnames";
import {useLocation} from "react-router-dom";
import {Content} from "../layout/Content";

const Cover = () => {
  const { isMenuRunning } = useMenuContext();

  return (
    <div className={cx('menuCover', isMenuRunning && 'running')} />
  )
}

type MenuItemType = {
  link: string;
  title: string;
  value?: string;
}

const menuItems: Array<MenuItemType> = [
  {
    link: '/',
    title: 'Index',
    value: ''
  },
  {
    link: '/work',
    title: 'Work',
    value: '139'
  },
  {
    link: '/about',
    title: 'About',
  },
  {
    link: '/join',
    title: 'Join',
    value: '3'
  },
  {
    link: '/contacts',
    title: 'Contact',
  },
]

const MenuContent = () => {
  const { isMenuRunning, isOpen } = useMenuContext();
  const { pathname } = useLocation()

  return (
    <div className={cx('menu', { 'open': isOpen, 'closing': !isOpen && isMenuRunning })}>
      <Content className="menuContainer">
        <div className="menuWrapper">
          <div className="menuInner">

          </div>
        </div>
      </Content>
    </div>
  )
}

const Menu = () => (
  <>
    <Cover />
    <MenuContent />
  </>
)

export { Menu }
