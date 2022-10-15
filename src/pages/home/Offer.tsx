import {Content} from "../../components/layout/Content";
import {Title} from "../../components/typography/Title";

import './Offer.scss'

const stats = [
  {
    index: '.01',
    title: 'Digital Experience',
    description: 'We craft practical and intuitive products that deliver unique experiences for your customers.',
  },
  {
    index: '.02',
    title: 'Enterprise Platforms',
    description: 'We are building systems that help your team to be on track of the business goals efficiently.',
  },
  {
    index: '.03',
    title: 'Visual Identity',
    description: 'Products should evolve, moreover easy to scale, we create components & guidelines design systems according to this call',
  },
  {
    index: '.04',
    title: 'Mobile Applications',
    description: 'We craft user-friendly mobile experiences & journeys that are intuitive & involving. Both IOS & Android',
  },
  {
    index: '.05',
    title: 'Tailor-made Websites',
    description: 'Whether the goal is to oustand or to be plain, we tailor websites that hook and explain the needed story',
  },
  {
    index: '.06',
    title: 'Guidelines & Systems',
    description: 'Products should grow & evolve, so we create components & guidelines design systems according to this call',
  },
]

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
            <ul className="homeOfferStatsList">
              {stats.map((it) => (
                <li className="homeOfferStatItem" key={it.index}>
                  <p className="homeOfferStatItemIndex">{it.index}</p>
                  <Title level={4} className="homeOfferStatItemTitle">{it.title}</Title>
                  <p className="homeOfferStatItemDescription">{it.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Content>
  )
}

export { Offer };
