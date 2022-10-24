import './CTAButton.scss'
import {useHistory} from "react-router-dom";
import {AppTheme} from "../../types/types";
import cx from "classnames";
import {useMenuContext} from "../../contexts/MenuContext";

type Props = {
  title: string;
  subtitle?: string;
  link?: string;
  theme?: AppTheme
  onClick?: () => void;
}

const CTAButton = ({title, subtitle, link, theme = "dark", onClick = () => undefined}: Props) => {
  const navigate = useHistory()
  const { setCoverRunning } = useMenuContext()

  return (
    <div className={cx('ctaButton cursorLink', theme)} onClick={() => {
      if (link) {
        setCoverRunning()

        setTimeout(() => {
          onClick()
          navigate.push(link)
        }, 500)
      } else {
        onClick()
      }
    }}>
      <div className="line top"/>
      <div className="line bottom"/>
      <div className="title">{title}</div>
      {subtitle && <div className="subtitle">{subtitle}</div>}
    </div>
  );
};

export {CTAButton};
