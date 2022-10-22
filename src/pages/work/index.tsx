import {FC} from "react";
import {DefaultLayout} from "../../components/layout/DefaultLayout";
import './index.scss'
import {Content} from "../../components/layout/Content";
import {Title} from "../../components/typography/Title";
import {WorkCard, WorkCardProps} from "../../components/card/WorkCard";

const data: Array<WorkCardProps> = [
  {
    domain: "DCIM",
    title: 'Dice',
    description: 'Dice provides cost-effective solutions for environmental, power and surveillance monitoring of data centers. An easily scalable and configurable system is the cornerstone of the product.',
    image: '',
    link: '',
  },
  {
    domain: "DCIM",
    title: 'Dice',
    description: 'Dice provides cost-effective solutions for environmental, power and surveillance monitoring of data centers. An easily scalable and configurable system is the cornerstone of the product.',
    image: '',
    link: '',
  },
  {
    domain: "DCIM",
    title: 'Dice',
    description: 'Dice provides cost-effective solutions for environmental, power and surveillance monitoring of data centers. An easily scalable and configurable system is the cornerstone of the product.',
    image: '',
    link: '',
  },
  {
    domain: "DCIM",
    title: 'Dice',
    description: 'Dice provides cost-effective solutions for environmental, power and surveillance monitoring of data centers. An easily scalable and configurable system is the cornerstone of the product.',
    image: '',
    link: '',
  },
  {
    domain: "DCIM",
    title: 'Dice',
    description: 'Dice provides cost-effective solutions for environmental, power and surveillance monitoring of data centers. An easily scalable and configurable system is the cornerstone of the product.',
    image: '',
    link: '',
  },
  {
    domain: "DCIM",
    title: 'Dice',
    description: 'Dice provides cost-effective solutions for environmental, power and surveillance monitoring of data centers. An easily scalable and configurable system is the cornerstone of the product.',
    image: '',
    link: '',
  },
  {
    domain: "DCIM",
    title: 'Dice',
    description: 'Dice provides cost-effective solutions for environmental, power and surveillance monitoring of data centers. An easily scalable and configurable system is the cornerstone of the product.',
    image: '',
    link: '',
  },
  {
    domain: "DCIM",
    title: 'Dice',
    description: 'Dice provides cost-effective solutions for environmental, power and surveillance monitoring of data centers. An easily scalable and configurable system is the cornerstone of the product.',
    image: '',
    link: '',
  },

]

const Work: FC = () => {
  return (
    <DefaultLayout className="workPage" title="Selected Work">
      <Content className="work">
        <Title className="title" level={1}>Selected Work</Title>
        <div className="worksListWrapper">
          {data.map((work, index) => (
            <WorkCard {...work} size={index === 1 || index === 2 ? 'small' : 'large'} key={index} />
          ))}
        </div>
      </Content>
    </DefaultLayout>
  )
}

export default Work
