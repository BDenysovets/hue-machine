import {FC, useMemo} from "react";
import './Works.scss'
import {Content} from "../../components/layout/Content";
// @ts-ignore
import { Parallax } from "react-parallax";
import {useWindowSize} from "react-use";
import {useHistory} from "react-router-dom";

import diceImg from '../work/assets/dice.jpg'
import diceImgMobile from '../work/assets/dice-min.jpg'
import eventuresImg from '../work/assets/eventures.jpg'
import eventuresImgMobile from '../work/assets/eventures-min.jpg'
import bundlsImg from '../work/assets/bundls.jpg'
import bundlsImgMobile from '../work/assets/bundls-min.jpg'
import {CTAButton} from "../../components/ctaButton/CTAButton";
import cx from "classnames";
import {useMenuContext} from "../../contexts/MenuContext";

export type ParallaxCardProps = {
  link: string;
  imageMobile: string;
  image: string;
  isLarge?: boolean;
}

const ParallaxCard: FC<ParallaxCardProps> = ({ imageMobile, image, link, isLarge }) => {
  const { width } = useWindowSize()
  const isMobile = useMemo(() => width < 768, [width])
  const navigate = useHistory()
  const {setCoverRunning} = useMenuContext()

  return (
    <div
      onClick={() => {
        setCoverRunning()

        setTimeout(() => {
          navigate.push(link)
        }, 500)
      }}
      className={cx('parallaxCardImageWrapper scrollAnimationItem', { 'large': isLarge, 'small': !isLarge })}
    >
      <Parallax
        bgImage={isMobile ? imageMobile : image}
        strength={isMobile ? 60 : isLarge ? 110 : 80}
        style={{ height: '100%' }}
      />
    </div>
  )
}

const Works: FC = () => {
  const { width } = useWindowSize()
  const isMobile = useMemo(() => width < 768, [width])

  return (
    <Content className="homeWorks">
      <div className="homeWorksWrapper">
        <div className="worksList">
          <div className="worksListItem cursorLink">
            <ParallaxCard isLarge={true} link="/work" image={diceImg} imageMobile={diceImgMobile} />
          </div>
          <div className="worksListItem cursorLink">
            <ParallaxCard link="/work" image={eventuresImg} imageMobile={eventuresImgMobile} />
          </div>
          <div className="worksListItem cursorLink">
            <ParallaxCard link="/work" image={bundlsImg} imageMobile={bundlsImgMobile} />
            {!isMobile && <CTAButton link="/work" theme="light" title="SELECTED WORKS" />}
          </div>
        </div>
        {isMobile && <CTAButton link="/work" theme="light" title="SELECTED WORKS" />}
      </div>
    </Content>
  )
}

export { Works }
