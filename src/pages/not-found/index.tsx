import {FC, useEffect, useState} from "react";
import {DefaultLayout} from "../../components/layout/DefaultLayout";
import balloon from './assets/balloon.svg'
import {CTAButton} from "../../components/ctaButton/CTAButton";
import './index.scss'
import {Content} from "../../components/layout/Content";
import {Title} from "../../components/typography/Title";
import cx from "classnames";
import {useHistory} from "react-router-dom";

const NotFound: FC = () => {
  const [isGoingToNextPage, setIsGoingToNextPage] = useState(false);
  const navigate = useHistory();

  useEffect(() => {
    if (isGoingToNextPage) {
      setTimeout(() => {
        navigate.push('/')
        setIsGoingToNextPage(false)
      }, 1400)
    }
  }, [isGoingToNextPage, navigate])

  return (
    <DefaultLayout hasFooter={false} className="notFoundPage" title="404">
      <Content className="notFound">
        <div className="visual">
          <Title className="title" level={1}>404</Title>
          <img className={cx('image', isGoingToNextPage && 'running')} src={balloon} alt="balloon"/>
        </div>
        <div className="actions">
          <div className="actionsWrapper">
            <CTAButton
              title="Hop on"
              theme="light"
              onClick={() => setIsGoingToNextPage(true)}
              subtitle="It will take you back home"
            />
          </div>
        </div>
      </Content>
    </DefaultLayout>
  )
}

export default NotFound
