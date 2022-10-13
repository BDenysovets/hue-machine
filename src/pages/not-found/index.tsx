import {FC} from "react";
import {DefaultLayout} from "../../components/layout/DefaultLayout";
import balloon from './assets/balloon.svg'
import {CTAButton} from "../../components/ctaButton/CTAButton";
import './index.scss'
import {Content} from "../../components/layout/Content";

const NotFound: FC = () => {
  return (
    <DefaultLayout hasFooter={false} className="notFoundPage">
      <Content className="notFound">

        <h1 className="title">404</h1>
        <img className="image" src={balloon} alt="balloon"/>
        <CTAButton title="Hop on" subtitle="It will take you back home" link="/" />
      </Content>
    </DefaultLayout>
  )
}

export default NotFound
