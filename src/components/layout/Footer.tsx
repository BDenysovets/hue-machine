import {Content} from "./Content";
import './Footer.scss'
import {Logo} from "../logo/Logo";
import {AppTheme} from "../../types/types";
import cx from "classnames";

const socials = [
  {
    text: 'TWITTER',
    link: 'https://twitter.com',
  },
  {
    text: 'instagram',
    link: 'https://instagram.com',
  },
  {
    text: 'dribbble',
    link: 'https://dribbble.com',
  },
  {
    text: 'linkedin',
    link: 'https://linkedin.com',
  },
]

const addresses = [
  {
    title: 'General inquiries',
    text: 'hello@huemachine.co',
    link: 'mailto:hello@huemachine.co',
  },
  {
    title: 'HQ',
    text: '1 Long Lane, London SE1 4PG, United Kingdom',
    link: 'https://goo.gl/maps/raDyiwCPFbXiduhm7',
  },
  {
    title: 'Careers',
    text: 'careers@huemachine.co',
    link: 'mailto:careers@huemachine.co',
  },
  {
    title: 'DC',
    text: 'Velyka Vasylkivska St, 98, Kyiv, Ukraine',
    link: 'https://goo.gl/maps/MLrfm1RGdPeVQodi6',
  },
]

type Props = {
  theme?: AppTheme
}

const Footer = ({ theme }: Props) => {
  return (
    <Content className={cx('footer', theme)}>
      <div className="footerWrapper">
        <div className="footerContent">
          <Logo theme="light" />
          <div className="footerAddresses">
            {addresses.map(address => (
              <div className="footerAddressItem cursorLink" key={address.text}>
                <p className="footerAddressTitle">{address.title}</p>
                <a href={address.link} rel="noreferrer" target={address.link.startsWith('https') ? "_blank" : "_self"}>{address.text}</a>
              </div>
            ))}
          </div>
        </div>
        <div className="footerSocialsWrapper">
          <ul className="footerSocials">
            {socials.map(social => (
              <li className="footerSocialsItem cursorLink" key={social.text}>
                <a href={social.link} target="_blank" rel="noreferrer">{social.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Content>
  )
}

export { Footer, socials }
