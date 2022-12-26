import {Content} from "../../components/layout/Content";
import './Achievements.scss'
import {Title} from "../../components/typography/Title";
import {useHistory} from "react-router-dom";
import {useMenuContext} from "../../contexts/MenuContext";

const data = [
  'Central Bank',
  'Microsoft',
  'Clair',
  'Quantum Metric',
  'Doordash',
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

const Achievements = () => {
  const navigate = useHistory()
  const {setCoverRunning} = useMenuContext()

  return (
    <Content className="homeAchievements">
      <div className="homeAchievementsWrapper">
        <div className="homeAchievementsTitling">
          <Title level={2}>Selected Clients</Title>
          <p className='homeAchievementsCta'>
            <span>Want to chat? </span>
            <span
              onClick={() => {
                setCoverRunning()

                setTimeout(() => {
                  navigate.push('/contacts')
                }, 500)
              }}
              className="cursorLink"
            >
              Get in touch
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
}

export {Achievements}
