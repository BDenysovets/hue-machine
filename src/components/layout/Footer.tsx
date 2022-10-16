import {Content} from "./Content";
import './Footer.scss'
import {Logo} from "../logo/Logo";

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
    text: '1 Long Lane, London SE1 4PG',
    link: 'https://goo.gl/maps/raDyiwCPFbXiduhm7',
  },
  {
    title: 'Careers',
    text: 'careers@huemachine.co',
    link: 'mailto:careers@huemachine.co',
  },
  {
    title: 'DC',
    text: 'Velyka Vasylkivska St, 98',
    link: 'https://goo.gl/maps/MLrfm1RGdPeVQodi6',
  },
]

const Footer = () => {
  return (
    <Content className="footer">
      <div className="footerWrapper">
        <div className="footerContent">
          <Logo theme="light" />
          <div className="footerAddresses">
            {addresses.map(address => (
              <div className="footerAddressItem">
                <p className="footerAddressTitle">{address.title}</p>
                <a href={address.link}>{address.text}</a>
              </div>
            ))}
          </div>
        </div>
        <ul className="footerSocials">
          {socials.map(social => (
            <li className="footerSocialsItem">
              <a href={social.link} target="_blank" rel="noreferrer">{social.text}</a>
            </li>
          ))}
        </ul>
      </div>
    </Content>
  )
}

export { Footer }
