import cx from "classnames";
// @ts-ignore
import { Parallax } from "react-parallax";
import './WorkCard.scss'
import {useState} from "react";
// @ts-ignore
import MouseTooltip from 'react-sticky-mouse-tooltip';

export type WorkCardProps = {
  size?: 'large' | 'small'
  domain: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  className?: string
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const WorkCard = ({ size = 'large', domain, image, description, title, link, className, onMouseEnter, onMouseLeave }: WorkCardProps) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)

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
          className="workCardImageWrapper cursorLink"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Parallax bgImage={image} strength={110} style={{ height: '115%' }} />
        </a>
      ) : (
        <div
          className="workCardImageWrapper"
          onMouseEnter={() => {
            onMouseEnter()
            setIsPopoverVisible(true)
          }}
          onMouseLeave={() => {
            onMouseLeave()
            setIsPopoverVisible(false)
          }}
        >
          <Parallax bgImage={image} strength={110} style={{ height: '115%' }} />
          <MouseTooltip
            visible={isPopoverVisible}
            offsetX={-60}
            offsetY={20}
          >
            <span className="cardTooltip">Coming soon</span>
          </MouseTooltip>
        </div>
      )}
    </div>
  )
}

export { WorkCard }
