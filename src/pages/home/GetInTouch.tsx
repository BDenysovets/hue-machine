import {Content} from "../../components/layout/Content";
import {Link} from "react-router-dom";
import './GetInTouch.scss'
import {AppTheme} from "../../types/types";
import {FC} from "react";
import cx from "classnames";

const ListItem = () => (
  <Link to="/contacts" className="homeGetInTouchCarouselItem cursorLink">
    <span>Get in touch </span>
    <span>We are here to help</span>
  </Link>
)

type Props = {
  theme?: AppTheme
}

const GetInTouch: FC<Props> = ({ theme= 'dark' }) => (
  <Content className={cx('homeGetInTouch', theme)}>
    <div className="homeGetInTouchCarousel">
      {Array.from(Array(160).keys()).map(it => <ListItem key={it} />)}
    </div>
  </Content>
)

export {GetInTouch}
