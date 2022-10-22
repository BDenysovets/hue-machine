import {Content} from "../../components/layout/Content";
import {Title} from "../../components/typography/Title";
import {CTAButton} from "../../components/ctaButton/CTAButton";

import './Hero.scss'

const Hero = () => {
  return (
    <Content className="homeHero">
      <div className="homeHeroWrapper">
        <Title level={2}>
          We tailor communication to help your business evolve in an interconnected,
          unpredictable & fast-paced digital environment
        </Title>
        <CTAButton title="Get in touch" theme="light" link="/contacts" subtitle="*we don’t consider any gambling" />
      </div>
    </Content>
  )
}

export { Hero };
