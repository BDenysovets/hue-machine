import {Content} from "../../components/layout/Content";
import {Title} from "../../components/typography/Title";

import './Hero.scss'
import {CTAButton} from "../../components/ctaButton/CTAButton";

const Hero = () => {
  return (
    <Content className="homeHero">
      <div className="homeHeroWrapper">
        <Title level={2}>
          We tailor communication. Communication for the purpose, solution
          & values through designing tailor-made products. Within tactic and strategy.
        </Title>
        <CTAButton title="Get in touch" theme="light" link="/" subtitle="*we don’t consider any gambling" />
      </div>
    </Content>
  )
}

export { Hero };
