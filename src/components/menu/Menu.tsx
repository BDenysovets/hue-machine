import './Menu.scss'
import {useMenuContext} from "../../contexts/MenuContext";
import cx from "classnames";
import {AnimatePresence, motion, usePresence} from "framer-motion";
import {useEffect} from "react";

const Cover = () => {
  const { isOpen, isMenuRunning } = useMenuContext();
  const [isPresent, safeToRemove] = usePresence()

  useEffect(() => {
    console.log('isMenuRunning', isMenuRunning)
  }, [isMenuRunning])

  useEffect(() => {
    !isPresent && setTimeout(safeToRemove, 5000)
  }, [isPresent])

  return (
    <div className={cx('menuCover', isMenuRunning && 'running')} />
  )
}

const Menu = () => {
  const { isOpen } = useMenuContext();

  return (
    <AnimatePresence>
      <Cover />
    </AnimatePresence>
  )
}

export { Menu }
