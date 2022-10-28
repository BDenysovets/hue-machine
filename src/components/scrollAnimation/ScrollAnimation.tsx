import {FC, useEffect} from "react";

const ScrollAnimation: FC = ({ children }) => {
  useEffect(() => {
    const animItems: NodeListOf<HTMLElement> = document.querySelectorAll('.scrollAnimationItem')

    function calcItemOffset(elem: HTMLElement): number {
      const elementTop = elem.getBoundingClientRect().top
      const scrollTop = window.scrollY || document.documentElement.scrollTop

      return elementTop + scrollTop
    }

    function animOnScroll() {
      let prevItem: HTMLElement | undefined;

      animItems?.forEach(item => {
        const offset = calcItemOffset(item)
        const startPoint = window.innerHeight * 0.6
        const endPoint = window.innerHeight * 0.3
        const middlePoint = (startPoint + endPoint) / 2

        if (window.scrollY > offset - middlePoint * 1.2 && window.scrollY < offset - middlePoint * 0.8) {
          item.classList.add('active')
          prevItem?.classList.remove('active')
        } else {
          item?.classList.remove('active')
        }

        prevItem = item
      })
    }

    if (animItems.length > 0) {
      window.addEventListener('scroll', animOnScroll)
      window.addEventListener('resize', () => {
        window.addEventListener('scroll', animOnScroll)
      })
    }

    return () => {
      window.removeEventListener('scroll', animOnScroll)
    }
  }, [])

  return <>{children}</>
}

export { ScrollAnimation }