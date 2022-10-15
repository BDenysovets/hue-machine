import {Content} from "../../components/layout/Content";
import './Latest.scss'

const data = [
  {
    title: 'E.ventures is now Headline.',
    subtitle: 'Headline brings our global investing teams into a single brand, which celebrates the businesses we support around the world.',
  },
  {
    title: 'Clair',
    subtitle: 'Today we’re happy to announce that we’ve raised a $15M Series A round, led by Kareem Zaki at Thrive Capital, to continue working towards our mission.',
  },
  {
    title: 'Mero',
    subtitle: 'Mero named Best in Class for the Commercial category of the Canadian Proptech Innovation Award, in partnership with Propel by MIPIM.',
  },
]

const Latest = () => (
  <Content className="homeLatest">
    <div className="homeLatestWrapper">
      <p className="homeLatestTitle">Latest FROM Our clients</p>
      <ul className="homeLatestGrid">
        {data.map(it => (
          <li className="homeLatestGridItem" key={it.title}>
            <p className="homeLatestGridItemTitle">{it.title}</p>
            <p className="homeLatestGridItemSubtitle">{it.subtitle}</p>
          </li>
        ))}
      </ul>
    </div>
  </Content>
)

export { Latest }
