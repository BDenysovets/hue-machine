import {FC, useMemo} from "react";
import {DefaultLayout} from "../../components/layout/DefaultLayout";
import './index.scss'
import {Content} from "../../components/layout/Content";
import {Title} from "../../components/typography/Title";
import {CallToAction} from "./CallToAction";
import {GetInTouch} from "../home/GetInTouch";
import {data} from "../work";
import {useWindowSize} from "react-use";
import {useHistory} from "react-router-dom";
import {useMenuContext} from "../../contexts/MenuContext";
import cx from "classnames";
// @ts-ignore
import { Parallax } from "react-parallax";

const aboutInfos = [
  {
    title: 'Who we are',
    description: 'Hue&Machine is an independent & multidimensional full service, platform-agnostic, design & branding studio based in London and Kyiv. We do care deeply about what we do and have become experts in designing rich, simple & intuitive products. We are not focused on award-winning applications, we build experiences that create value & reach goals. Our present & past clients are brands like Microsoft, Snap Inc., and Headline.',
  },
  {
    title: 'Areas',
    description: 'We tailor communication to advance the purpose of your business, solution & values by designing tailor-made products in different domains, such as financial, healthcare, proptech, retail, energy & automotive, etc.',
  },
  {
    title: 'Dream PROJECTS',
    description: 'We have a strong experience working on a variaty of projects and are super passionate to work on Enterprise Platforms, SaaS products, Mobile Applications, Branding, Design Systems & Investor Pitch Assistance.',
  },
]
const stats = [
  {
    value: '150+',
    title: 'digital products',
    description: 'Delivered across different domains, from financial and retail to energy & automotive.'
  },
  {
    value: '600M+',
    title: 'US dollars',
    description: 'Raised & acquired by clients as the result of cooperation with our team.'
  },
  {
    value: '7',
    title: 'NATIONALITIES',
    description: 'A diverse creative team to navigate through unpredictable & fast-paced digital environment'
  },
  {
    value: '10+',
    title: 'Industry domains',
    description: 'We work with clients from across the globe - VCs, startups and global brands within different industries.'
  },
]
const firstStats = stats.slice(0, 2);
const secondStats = stats.slice(2, 4);
const workCases = data.filter(it => it.title === 'Talentree' || it.title === 'Bundls')

type SectionTitleProps = {
  text: string
}

const SectionTitle: FC<SectionTitleProps> = ({ text }) => (
  <p className="sectionTitle">{text}</p>
)

type GridCardProps = {
  value: string;
  title: string;
  description: string;
}

const GridCard: FC<GridCardProps> = ({ title, description, value }) => (
  <div className="aboutPageStatsListItem scrollAnimationItem">
    <p className="aboutPageStatsListItemValue">{value}</p>
    <p className="aboutPageStatsListItemTitle">{title}</p>
    <p className="aboutPageStatsListItemDescription">{description}</p>
  </div>
)

type WorkCardProps = {
  imageMobile?: string;
  image?: string;
  title: string;
  description: string;
}

const WorkCard: FC<WorkCardProps> = ({ image, imageMobile, description, title }) => {
  const { width } = useWindowSize()
  const isMobile = useMemo(() => width < 768, [width])
  const navigate = useHistory()
  const {setCoverRunning} = useMenuContext()

  return (
    <div className="aboutPageWorkCard cursorLink">
      <div
        onClick={() => {
          setCoverRunning()

          setTimeout(() => {
            navigate.push('/work')
          }, 500)
        }}
        className={cx('parallaxCardImageWrapper scrollAnimationItem')}
      >
        <Parallax
          bgImage={isMobile ? imageMobile : image}
          strength={isMobile ? 60 : 80}
          style={{ height: '100%' }}
        />
      </div>
      <p className="aboutPageWorkCardTitle">{title}</p>
      <p className="aboutPageWorkCardDescription">{description}</p>
    </div>
  )
}

const About: FC = () => {
  return (
    <DefaultLayout theme="light" className="aboutPage" title="About Us">
      <Content className="aboutPageHeroWrapper">
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
        <SectionTitle text="In Numbers" />
        <div className="aboutPageStatsListWrapper aboutPageStatsListWrapperHero">
          <div className="aboutPageStatsListInner">
            {firstStats.map((stat) => <GridCard {...stat} key={stat.title} />)}
          </div>
        </div>
      </Content>
      <GetInTouch theme="dark" />
      <Content className="aboutPageContentWrapper">
        <div className="aboutPageStatsListWrapper aboutPageStatsListWrapperContent">
          <div className="aboutPageStatsListInner">
            {secondStats.map((stat) => <GridCard {...stat} key={stat.title} />)}
          </div>
        </div>
        <SectionTitle text="Selected Work" />
        <div className="aboutPageWorks">
          {workCases.map(workCase => (
            <WorkCard
              description={workCase.description}
              title={workCase.title}
              key={workCase.title}
              imageMobile={workCase.imageMobile}
              image={workCase.image}
            />
          ))}
        </div>
      </Content>
      <CallToAction />
    </DefaultLayout>
  )
}

export default About
