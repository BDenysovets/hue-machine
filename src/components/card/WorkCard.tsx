import cx from "classnames";
// @ts-ignore
import { Parallax } from "react-parallax";
// @ts-ignore
import MouseTooltip from 'react-sticky-mouse-tooltip';
import './WorkCard.scss'
import {useMemo, useState} from "react";
import {useWindowSize} from "react-use";

export type WorkCardProps = {
  size?: 'large' | 'small'
  domain: string;
  title: string;
  description: string;
  image?: string;
  imageMobile?: string;
  link?: string;
  className?: string
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const WorkCard = ({ size = 'large', domain, image, imageMobile, description, title, link, className, onMouseEnter, onMouseLeave }: WorkCardProps) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)
  const { width } = useWindowSize()
  const isMobile = useMemo(() => width < 768, [width])
  const isTablet = useMemo(() => width > 768 && width < 1200, [width])

  return (
    <div className={cx('workCard', size, className)}>
      <p className="workCardDomain">{domain}</p>
      <div className="workCardInfo">
        <p className="wordCardTitle">{title}</p>
        <p className="wordCardDescription">{description}</p>
      </div>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="workCardImageWrapper scrollAnimationItem cursorLink"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Parallax
            bgImage={isMobile ? imageMobile : image}
            strength={isMobile ? 40 : isTablet ? 55 : size === 'large' ? 100 : 80}
            style={{ height: '100%' }}
          />
        </a>
      ) : (
        <div
          className="workCardImageWrapper scrollAnimationItem"
          onMouseEnter={() => {
            onMouseEnter()
            setIsPopoverVisible(true)
          }}
          onMouseLeave={() => {
            onMouseLeave()
            setIsPopoverVisible(false)
          }}
        >
          <Parallax
            bgImage={isMobile ? imageMobile : image}
            strength={isMobile ? 40 : isTablet ? 55 : size === 'large' ? 100 : 80}
            style={{ height: '100%' }}
          />
        </div>
      )}
      {!link && (
        <MouseTooltip
          visible={isPopoverVisible}
          offsetX={13}
          offsetY={20}
        >
          <span className="cardTooltip">Coming soon</span>
        </MouseTooltip>
      )}
    </div>
  )
}

export { WorkCard }
