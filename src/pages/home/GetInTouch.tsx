import {Content} from "../../components/layout/Content";
import {useHistory} from "react-router-dom";
import './GetInTouch.scss'
import {AppTheme} from "../../types/types";
import {FC} from "react";
import cx from "classnames";
import {useMenuContext} from "../../contexts/MenuContext";

const ListItem = () => {
  const navigate = useHistory()
  const {setCoverRunning} = useMenuContext()

  return (
    <div
      onClick={() => {
        setCoverRunning()

        setTimeout(() => {
          navigate.push('/contacts')
        }, 500)
      }}
      className="homeGetInTouchCarouselItem cursorLink"
    >
      <span>Get in touch </span>
      <span>We are here to help</span>
    </div>
  )
}

type Props = {
  theme?: AppTheme
}

const GetInTouch: FC<Props> = ({theme = 'dark'}) => (
  <Content className={cx('homeGetInTouch', theme)}>
    <div className="homeGetInTouchCarousel">
      {Array.from(Array(160).keys()).map(it => <ListItem key={it}/>)}
    </div>
  </Content>
)

export {GetInTouch}
