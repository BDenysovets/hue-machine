import {FC, useEffect, useState} from "react";
import {DefaultLayout} from "../../components/layout/DefaultLayout";
import balloon from './assets/balloon.svg'
import {CTAButton} from "../../components/ctaButton/CTAButton";
import './index.scss'
import {Content} from "../../components/layout/Content";
import {Title} from "../../components/typography/Title";
import cx from "classnames";
import {useMenuContext} from "../../contexts/MenuContext";

const NotFound: FC = () => {
  const [isGoingToNextPage, setIsGoingToNextPage] = useState(false);
  const { goToPage } = useMenuContext()

  useEffect(() => {
    if (isGoingToNextPage) {
      setTimeout(() => {
        goToPage('/')
        setIsGoingToNextPage(false)
      }, 1400)
    }
  }, [isGoingToNextPage, goToPage])

  return (
    <DefaultLayout hasFooter={false} className="notFoundPage">
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
