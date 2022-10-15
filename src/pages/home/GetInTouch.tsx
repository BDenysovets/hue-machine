import {Content} from "../../components/layout/Content";
import {Link} from "react-router-dom";
import './GetInTouch.scss'

const ListItem = () => (
  <Link to="/contact" className="homeGetInTouchCarouselItem">
    <span>Get in touch</span>
    <span>We are here to help</span>
  </Link>
)

const GetInTouch = () => {

  return (
    <Content className="homeGetInTouch">
      <div className="homeGetInTouchCarousel">
        {Array.from(Array(16).keys()).map(it => <ListItem key={it} />)}
      </div>
    </Content>
  )
}

export {GetInTouch}
