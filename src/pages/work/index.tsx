import {FC, useState} from "react";
import {DefaultLayout} from "../../components/layout/DefaultLayout";
import './index.scss'
import {Content} from "../../components/layout/Content";
import {Title} from "../../components/typography/Title";
import {WorkCard, WorkCardProps} from "../../components/card/WorkCard";

import diceImg from './assets/dice.jpg'
import diceImgMobile from './assets/dice-min.jpg'
import clairImg from './assets/clair.jpg'
import clairImgMobile from './assets/clair-min.jpg'
import fittrackImg from './assets/fittrack.jpg'
import fittrackImgMobile from './assets/fittrack-min.jpg'
import eventuresImg from './assets/eventures.jpg'
import eventuresImgMobile from './assets/eventures-min.jpg'
import bundlsImg from './assets/bundls.jpg'
import bundlsImgMobile from './assets/bundls-min.jpg'
import talentreeImg from './assets/talentree.jpg'
import talentreeImgMobile from './assets/talentree-min.jpg'
import medeeImg from './assets/medee.jpg'
import medeeImgMobile from './assets/medee-min.jpg'
import vulnImg from './assets/vuln.jpg'
import vulnImgMobile from './assets/vuln-min.jpg'
import meroImg from './assets/mero.jpg'
import meroImgMobile from './assets/mero-min.jpg'
import {GetInTouch} from "../home/GetInTouch";
import cx from "classnames";
import {CallToAction} from "../home/CallToAction";

export const data: Array<Omit<WorkCardProps, 'onMouseLeave' | 'onMouseEnter'>> = [
  {
    domain: "DCIM",
    title: 'Dice',
    description: 'Dice provides cost-effective solutions for DCIM, environmental, power and surveillance monitoring of data centers. An easily scalable and configurable system is the cornerstone of the product.',
    image: diceImg,
    imageMobile: diceImgMobile,
  },
  {
    domain: "Fintech",
    title: 'Clair',
    description: 'Clair is a New York-based mission driven digital banking platform that provides American workers with fee-free access to their earnings anytime via Clair Debit Mastercard and FDIC-insured Spending and Savings accounts.',
    image: clairImg,
    imageMobile: clairImgMobile,
    link: 'https://getclair.com/',
  },
  {
    domain: "Healthcare",
    title: 'Fittrack',
    description: 'FitTrack is a simple solution to help you gain insight into your health. A smart scale and app designed to work together seamlessly.',
    image: fittrackImg,
    imageMobile: fittrackImgMobile,
    link: 'https://uk.fittrack.com/',
  },
  {
    domain: "Fintech",
    title: 'E.ventures',
    description: 'Eva is analytics & trading enterprise solution for venture capital firm with an early-stage investment approach. *Acquired by Headline.',
    image: eventuresImg,
    imageMobile: eventuresImgMobile,
    link: 'https://headline.com/',
  },
  {
    domain: "Crypto",
    title: 'Bundls',
    description: 'Bundls is a secure online platform for buying, selling, transferring, and storing cryptocurrency. You can also connect your bank account to its wallet for everyday purchases.',
    image: bundlsImg,
    imageMobile: bundlsImgMobile,
  },
  {
    domain: "Edtech",
    title: 'Talentree',
    description: 'Talentree is online teaching tool for blended learning, which provides combination of in-person & online learning based on the results of analytical studies of students behaviour.  ',
    image: talentreeImg,
    imageMobile: talentreeImgMobile,
  },
  {
    domain: "Healthcare",
    title: 'Medee',
    description: 'Medee is a meditation & well-being mobile application created in cooperation with professional therapists & mental health experts.',
    image: medeeImg,
    imageMobile: medeeImgMobile,
  },
  {
    domain: "cyber security",
    title: 'Vuln.Watch',
    description: 'Vuln.Watch is a SaaS tool designed for vulnerability assessment, infrastructure security audits & cloud security assessments.',
    image: vulnImg,
    imageMobile: vulnImgMobile,
  },
  {
    domain: "Proptech",
    title: 'Mero',
    description: 'Mero is the Cleaning Control Center for commercial buildings. It’s sensor and analytics platform gives property managers and commercial cleaners the real-time data, insights, and training needed to reduce consumables waste, prevent complaints and deliver a premium tenant experience.',
    image: meroImg,
    imageMobile: meroImgMobile,
    link: 'https://www.mero.co/',
  },
]

const firstList = data.slice(0, 5)
const secondList = data.slice(5, 10)

const Work: FC = () => {
  const [isCardHovered, setIsCardHovered] = useState(false);

  return (
    <DefaultLayout className="workPage" title="Selected Work">
      <Content className="work">
        <div className="workWrapper">
          <Title className="title" level={1}>Selected Work</Title>
          <div className="workContent">
            <div className="worksListWrapper">
              {firstList.map((work, index) => (
                <WorkCard
                  {...work}
                  key={index}
                  onMouseEnter={() => setIsCardHovered(true)}
                  onMouseLeave={() => setIsCardHovered(false)}
                  size={index === 2 || index === 3 ? 'small' : 'large'}
                  className={cx({ 'withPaddingBottom': index === 2, 'withPaddingTop': index === 3 })}
                />
              ))}
            </div>
            <div className={cx('workPageGetInTouch', { 'hidden': isCardHovered })}>
              <div className="workPageGetInTouchWrapper">
                <GetInTouch theme="light" />
              </div>
            </div>
            <div className="worksListWrapper">
              {secondList.map((work, index) => (
                <WorkCard
                  {...work}
                  onMouseEnter={() => setIsCardHovered(true)}
                  onMouseLeave={() => setIsCardHovered(false)}
                  size={index === 1 || index === 2 ? 'small' : 'large'}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </Content>
      <CallToAction />
    </DefaultLayout>
  )
}

export default Work
