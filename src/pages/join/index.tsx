import {FC} from "react";
import { DefaultLayout } from "../../components/layout/DefaultLayout";
import {Content} from "../../components/layout/Content";
import {Title} from "../../components/typography/Title";
import './index.scss'

const jobs = {
  design: [
    {
      title: 'Product Designer Intern',
      description: 'We help companies to grow their relationships with their customers, solve problems, embrace exciting opportunities in different domains',
    },
    {
      title: 'Middle Product Designer',
      description: 'We help companies to grow their relationships with their customers, solve problems, embrace exciting opportunities in different domains',
    },
    {
      title: 'Middle Product Designer',
      description: 'We help companies to grow their relationships with their customers, solve problems, embrace exciting opportunities in different domains',
    },
  ],
  development: [
    {
      title: 'Senior Developer',
      description: 'We help companies to grow their relationships with their customers, solve problems, embrace exciting opportunities in different domains',
    },
  ],
  'marketing & communications': [
    {
      title: 'Marketing Executive',
      description: 'We help companies to grow their relationships with their customers, solve problems, embrace exciting opportunities in different domains',
    },
  ],
}

const Join: FC = () => {
  return (
    <DefaultLayout theme="dark" title="Join">
      <Content className="joinPage">
        <Title level={2} className="joinPageTitle">Join</Title>
        <div className="joinListWrapper">
          <div className="joinListInner">
            {Object.entries(jobs).map(([domain, jobs]) => (
              <div className="domainItem">
                <p className="jobDomainTitle">{domain}</p>
                <div className="domainJobs">
                  {jobs.map(job => (
                    <div className="domainJobItem">
                      <Title level={5}>{job.title}</Title>
                      <p className="jobDescription">{job.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Content>
    </DefaultLayout>
  )
}

export default Join
