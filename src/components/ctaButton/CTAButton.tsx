import './CTAButton.scss'
import {useNavigate} from "react-router-dom";

type Props = {
  title: string;
  subtitle?: string;
  link: string;
}

const CTAButton = ({title, subtitle, link}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="ctaButton" onClick={() => navigate(link)}>
      <div className="line top"/>
      <div className="line bottom"/>
      <div className="title">{title}</div>
      {subtitle && <div className="subtitle">{subtitle}</div>}
    </div>
  );
};

export {CTAButton};
