import './CTAButton.scss'
import {useNavigate} from "react-router-dom";
import {AppTheme} from "../../types/types";
import cx from "classnames";

type Props = {
  title: string;
  subtitle?: string;
  link?: string;
  theme?: AppTheme
  onClick?: () => void;
}

const CTAButton = ({title, subtitle, link = "/", theme = "dark", onClick}: Props) => {
  const navigate = useNavigate();

  return (
    <div className={cx('ctaButton', theme)} onClick={() => onClick ? onClick() : navigate(link)}>
      <div className="line top"/>
      <div className="line bottom"/>
      <div className="title">{title}</div>
      {subtitle && <div className="subtitle">{subtitle}</div>}
    </div>
  );
};

export {CTAButton};
