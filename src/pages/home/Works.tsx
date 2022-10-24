import {FC, useMemo} from "react";
import './Works.scss'
import {Content} from "../../components/layout/Content";
// @ts-ignore
import { Parallax } from "react-parallax";
import {useWindowSize} from "react-use";
import {Link} from "react-router-dom";

import diceImg from '../work/assets/dice.jpg'
import diceImgMobile from '../work/assets/dice-min.jpg'
import eventuresImg from '../work/assets/eventures.jpg'
import eventuresImgMobile from '../work/assets/eventures-min.jpg'
import bundlsImg from '../work/assets/bundls.jpg'
import bundlsImgMobile from '../work/assets/bundls-min.jpg'
import {CTAButton} from "../../components/ctaButton/CTAButton";
import cx from "classnames";

type ParallaxCardProps = {
  link: string;
  imageMobile: string;
  image: string;
  isLarge?: boolean;
}

const ParallaxCard: FC<ParallaxCardProps> = ({ imageMobile, image, link, isLarge }) => {
  const { width } = useWindowSize()
  const isMobile = useMemo(() => width < 768, [width])

  return (
    <Link
      to={link}
      className={cx('parallaxCardImageWrapper cursorLink', { 'large': isLarge, 'small': !isLarge })}
    >
      <Parallax
        bgImage={isMobile ? imageMobile : image}
        strength={isMobile ? 60 : isLarge ? 110 : 80}
        style={{ height: '100%' }}
      />
    </Link>
  )
}

const Works: FC = () => {
  const { width } = useWindowSize()
  const isMobile = useMemo(() => width < 768, [width])

  return (
    <Content className="homeWorks">
      <div className="homeWorksWrapper">
        <div className="worksList">
          <div className="worksListItem">
            <ParallaxCard isLarge={true} link="/work" image={diceImg} imageMobile={diceImgMobile} />
          </div>
          <div className="worksListItem">
            <ParallaxCard link="/work" image={eventuresImg} imageMobile={eventuresImgMobile} />
          </div>
          <div className="worksListItem">
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
