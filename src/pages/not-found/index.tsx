import {FC} from "react";
import {DefaultLayout} from "../../components/layout/DefaultLayout";
import balloon from './assets/balloon.svg'
import {CTAButton} from "../../components/ctaButton/CTAButton";
import './index.scss'
import {Content} from "../../components/layout/Content";
import {Title} from "../../components/typography/Title";

const NotFound: FC = () => {
  return (
    <DefaultLayout hasFooter={false} className="notFoundPage">
      <Content className="notFound">
        <div className="visual">
          <Title className="title" level={1}>404</Title>
          <img className="image" src={balloon} alt="balloon"/>
        </div>
        <div className="actions">
          <div className="actionsWrapper">
            <CTAButton title="Hop on" subtitle="It will take you back home" link="/" />
          </div>
        </div>
      </Content>
    </DefaultLayout>
  )
}

export default NotFound
