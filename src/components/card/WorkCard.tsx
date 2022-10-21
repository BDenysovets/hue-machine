import cx from "classnames";
import './WorkCard.scss'

export type WorkCardProps = {
  size?: 'large' | 'small'
  domain: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  inDevelopment?: boolean;
}

const WorkCard = ({ size = 'large', inDevelopment = false, domain, image, description, title, link }: WorkCardProps) => {

  return (
    <div className={cx('workCard', size)}>
      <p className="workCardDomain">{domain}</p>
    </div>
  )
}

export { WorkCard }
