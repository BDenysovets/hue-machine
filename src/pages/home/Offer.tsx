import {Content} from "../../components/layout/Content";
import {Title} from "../../components/typography/Title";

import './Offer.scss'

const stats = [
  {
    index: '.01',
    title: 'Digital Experience',
    description: 'We craft actionable and intuitive products that deliver unique experiences for your customers.',
  },
  {
    index: '.02',
    title: 'Visual Identity',
    description: 'We work with aesthetics & bold vision to architect communications with users.',
  },
  {
    index: '.03',
    title: 'Enterprise Platforms',
    description: 'We build systems that help your team to be on track of business goals efficiently.',
  },
  {
    index: '.04',
    title: 'Mobile Applications',
    description: 'We craft user-friendly mobile experiences & journeys that are intuitive & engaging for both IOS & Android.',
  },
  {
    index: '.05',
    title: 'Tailor-made Websites',
    description: 'Whether the goal is to create something extraordinary or to fix the basics; we build websites that hook the audience & communicate core narratives.',
  },
  {
    index: '.06',
    title: 'Guidelines & Systems',
    description: 'We create step-by-step guidelines & design systems for the purpose of digital product evolution and transformation.',
  },
]

const Offer = () => {
  return (
    <Content className="homeOffer">
      <div className="homeOfferWrapper">
        <div className="homeOfferTitling">
          <Title level={2} className="homeOfferTitle">
            We design experiences that solve problems by digging
            into the core of business
          </Title>
          <p className="homeOfferDescription">
            We focus on robust, practical solutions to help companies gain a unique competitive
            advantage in building consumer base relationships, solving business challenges,
            and embracing exciting growth opportunities in various domains, be that finance,
            healthcare, proptech, etc.
          </p>
        </div>
        <div className="homeOfferStats">
          <div className="homeOfferStatsTitle">
            Our offer
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
