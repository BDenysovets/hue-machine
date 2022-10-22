import {Content} from "../../components/layout/Content";
import './Achievements.scss'
import {Title} from "../../components/typography/Title";
import {Link} from "react-router-dom";

const data = [
  'Central Bank',
  'Microsoft',
  'Clair',
  'Quantum Metric',
  'Doordash',
  'Rentorr',
  'Fittrack',
  'Snap Inc.',
  'Headline',
  'Sortly',
  'Housetable',
  'Transcarent',
  'Klover',
  'Yesplz',
  'Mero',
];

const Achievements = () => (
  <Content className="homeAchievements">
    <div className="homeAchievementsWrapper">
      <div className="homeAchievementsTitling">
        <Title level={2}>Achievements</Title>
        <p className='homeAchievementsCta'>
          <span>Want to chat? </span>
          <span>
            <Link to="/contacts">Get in touch</Link>
          </span>
        </p>
      </div>
      <div className="homeAchievementsListWrapper">
        <ul className="homeAchievementsList">
          {data.map(it => <li className="homeAchievementsListItem" key={it}><span>{it}</span></li>)}
        </ul>
      </div>
    </div>
  </Content>
)

export {Achievements}
