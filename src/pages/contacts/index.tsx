import {FC} from "react";
import { DefaultLayout } from "../../components/layout/DefaultLayout";
import {Content} from "../../components/layout/Content";
import {Title} from "../../components/typography/Title";
import './index.scss'
import {CTAButton} from "../../components/ctaButton/CTAButton";

const Contacts: FC = () => {
  return (
    <DefaultLayout theme="dark">
      <Content className="contactPage">
        <Title level={2} className="contactPageTitle">Contact</Title>
        <div className="contactPageForm">
          <div className="contactPageFormWrapper">
            <form className="contactForm">
              <input type="text"/>
              <input type="text"/>
              <textarea rows={10} />
            </form>
            <div className="formSubmission">
              <CTAButton title="Send a bird" theme="light" onClick={() => console.log('form submit')} />
            </div>
          </div>
        </div>
      </Content>
    </DefaultLayout>
  )
}

export default Contacts
