import {Content} from "../../components/layout/Content";
import {Title} from "../../components/typography/Title";

import './Offer.scss'

const data = {

}

const Offer = () => {
  return (
    <Content className="homeOffer">
      <div className="homeOfferWrapper">
        <div className="homeOfferTitling">
          <Title level={2} className="homeOfferTitle">
            We design experiences that solve problems by digging
            into the core of the business
          </Title>
          <p className="homeOfferDescription">
            We help companies to grow their relationships with their customers,
            solve problems, embrace exciting opportunities in different domains,
            such as financial, healthcare, proptech, etc.
          </p>
        </div>
        <div className="homeOfferStats">
          <div className="homeOfferStatsTitle">
            Our OFFER
          </div>
          <div className="homeOfferStatsContent">

          </div>
        </div>
      </div>
    </Content>
  )
}

export { Offer };
