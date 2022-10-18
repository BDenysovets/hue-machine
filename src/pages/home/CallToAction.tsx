import {Content} from "../../components/layout/Content";
import './CallToAction.scss'
import {Title} from "../../components/typography/Title";
import {CTAButton} from "../../components/ctaButton/CTAButton";

const CallToAction = () => (
  <Content className="homeCallToAction">
    <div className="homeCallToActionWrapper">
      <Title level={2} upperCase>
        Let’s face all<br />
        challenges together
      </Title>
      <CTAButton link="/contacts" title="Get in touch" />
    </div>
  </Content>
)

export { CallToAction }
