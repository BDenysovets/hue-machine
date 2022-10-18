import {FC} from "react";
import {DefaultLayout} from "../../components/layout/DefaultLayout";
import './index.scss'
import {Content} from "../../components/layout/Content";
import {Title} from "../../components/typography/Title";

const Work: FC = () => {
  return (
    <DefaultLayout className="workPage">
      <Content className="work">
        <Title className="title" level={1}>Work PAGE</Title>
      </Content>
    </DefaultLayout>
  )
}

export default Work
