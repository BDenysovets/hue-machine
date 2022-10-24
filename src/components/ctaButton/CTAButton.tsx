import './CTAButton.scss'
import {Link} from "react-router-dom";
import {AppTheme} from "../../types/types";
import cx from "classnames";

type Props = {
  title: string;
  subtitle?: string;
  link?: string;
  theme?: AppTheme
  onClick?: () => void;
}

const CTAButton = ({title, subtitle, link, theme = "dark", onClick = () => undefined}: Props) => {
  return (
    <div className="cursorLink">
      {link ? (
        <Link to={link} className={cx('ctaButton', theme)} onClick={() => onClick()}>
          <div className="line top"/>
          <div className="line bottom"/>
          <div className="title">{title}</div>
          {subtitle && <div className="subtitle">{subtitle}</div>}
        </Link>
      ) : (
        <div className={cx('ctaButton', theme)} onClick={() => onClick()}>
          <div className="line top"/>
          <div className="line bottom"/>
          <div className="title">{title}</div>
          {subtitle && <div className="subtitle">{subtitle}</div>}
        </div>
      )}
    </div>
  );
};

export {CTAButton};
