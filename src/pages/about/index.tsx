import {FC} from "react";
import {DefaultLayout} from "../../components/layout/DefaultLayout";
import './index.scss'
import {Content} from "../../components/layout/Content";
import {Title} from "../../components/typography/Title";
import {CTAButton} from "../../components/ctaButton/CTAButton";
import {CallToAction} from "./CallToAction";

const aboutInfos = [
  {
    title: 'Who we are',
    description: 'Hue&Machine is an independent full service, platform agnostic, design, branding and strategy group of people in London and Kyiv. Our present & past clients are brands like Microsoft, Snap Inc, and Headline since 2018. We do care deeply about what we do and have become experts in beautifully-designed software.',
  },
  {
    title: 'Areas',
    description: 'We help companies to grow their relationships with their customers, solve problems, embrace exciting opportunities in different domains, such as financial, healthcare, proptech, etc.',
  },
  {
    title: 'Dream PROJECTS',
    description: 'We have a strong experience working on variaty of projects, but it will be a huge bonus if yours include: Enterprise Platforms, Mobile Applications, Tailor-made Websites, Design Systems or even Investor Pitch Assistance',
  },
]

const stats = [
  {
    value: '137+',
    title: 'Projects',
    description: 'New technology. Autonomous driving. Huge opportunities for innovation in automotive clusters, HUDs, and HMIs.'
  },
  {
    value: '432M+',
    title: 'US dollars',
    description: 'raised by startups and companies, using our tailor-made investor packages, interactive prototypes, and digital solutions.'
  },
  {
    value: '83.4%',
    title: 'Companies',
    description: 'have returned to our team & decided to move forward with the long-term relationships.'
  },
  {
    value: '3.5',
    title: 'Rounds',
    description: 'of investments in average surpassed by our clients'
  },
]

const About: FC = () => {
  return (
    <DefaultLayout theme="light" className="aboutPage" title="About Us">
      <Content className="aboutPageWrapper">
        <Title className="aboutPageTitle" level={2}>About Us</Title>
        <div className="aboutPageListWrapper">
          <div className="aboutPageListInner">
            {aboutInfos.map((info) => (
              <div className="domainItem" key={info.title}>
                <p className="aboutPageItemTitle">{info.title}</p>
                <p className="aboutPageItemDescription">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
        <Title className="aboutPageSubtitle" level={3}>In Numbers</Title>
        <div className="aboutPageStatsListWrapper">
          <div className="aboutPageStatsListInner">
            {stats.map((stat) => (
              <div className="aboutPageStatsListItem" key={stat.title}>
                <p className="aboutPageStatsListItemValue">{stat.value}</p>
                <p className="aboutPageStatsListItemTitle">{stat.title}</p>
                <p className="aboutPageStatsListItemDescription">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
        <CTAButton title="Hire Us" link='/contacts' theme="dark" />
      </Content>
      <CallToAction />
    </DefaultLayout>
  )
}

export default About
