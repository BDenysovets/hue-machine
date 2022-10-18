import {FC} from "react";
import {DefaultLayout} from "../../components/layout/DefaultLayout";
import './index.scss'
import {Content} from "../../components/layout/Content";
import {Title} from "../../components/typography/Title";

const About: FC = () => {
  return (
    <DefaultLayout theme="light" className="aboutPage">
      <Content className="about">
        <Title className="title" level={1}>ABOUT PAGE</Title>
      </Content>
    </DefaultLayout>
  )
}

export default About
