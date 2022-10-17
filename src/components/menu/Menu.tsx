import './Menu.scss'
import {useMenuContext} from "../../contexts/MenuContext";
import cx from "classnames";
import {useLocation, useNavigate} from "react-router-dom";
import {Content} from "../layout/Content";
import {Logo} from "../logo/Logo";
import {socials} from "../layout/Footer";

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
  const { isMenuRunning, isOpen, closeMenu } = useMenuContext();
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <div className={cx('menu', { 'open': isOpen, 'closing': !isOpen && isMenuRunning })}>
      <Content className="menuContainer">
        <div className="menuWrapper">
          <div className="menuInner">
            <Logo theme="dark" />
            <div className="menuListWrapper">
              <div
                className={cx('menuListDecorator',
                  {
                    'menuListDecoratorRunning': isOpen && !isMenuRunning,
                    'menuListDecoratorEnding': !isOpen && isMenuRunning
                  })}
              />
              <ul
                className={cx('menuList',
                  {
                    'menuListRunning': isOpen && !isMenuRunning,
                    'menuListRunningEnding': !isOpen && isMenuRunning
                  })}
              >
                {menuItems.map(it => (
                  <li
                    key={it.title}
                    className={cx('menuListItem', pathname === it.link && 'active')}
                    onClick={() => {
                      closeMenu && closeMenu();
                      navigate(it.link)
                    }}
                  >
                    <p className="menuListItemTitle">{it.title}</p>
                    {it.value && <p className="menuListItemValue">{it.value}</p>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="menuSocialsWrapper">
              <ul className={cx('menuSocialsList',
                {
                  'menuSocialsListRunning': isOpen && !isMenuRunning,
                  'menuSocialsListRunningRunningEnding': !isOpen && isMenuRunning
                }
              )}>
                {socials.map(social => (
                  <li className="menuSocialsListItem" key={social.text}>
                    <a href={social.link} target="_blank" rel="noreferrer">{social.text}</a>
                  </li>
                ))}
              </ul>
            </div>
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
