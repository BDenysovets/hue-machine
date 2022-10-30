import {FC, useMemo, useState} from "react";
import { DefaultLayout } from "../../components/layout/DefaultLayout";
import {Content} from "../../components/layout/Content";
import {Title} from "../../components/typography/Title";
import './index.scss'
import {CTAButton} from "../../components/ctaButton/CTAButton";
import cx from "classnames";
import {sendMail} from "../../tools/mail";
import emailSuccessImage from './assets/emailSuccess.svg'

type FormValues = {
  name?: string;
  email?: string;
  message?: string;
}

type SuccessProps = {
  resetForm: () => void
}

const Success = ({ resetForm }: SuccessProps) => {
  return (
    <div className="formSuccessWrapper">
      <div className="emailSentImage">
        <img src={emailSuccessImage} alt="email sent"/>
      </div>
      <div className="formSuccessContent">
        <div className="formSuccessContentTitling">
          <Title level={2}>Thank You</Title>
          <p className="formSuccessContentDescription">
            The bird is on it`s way, we will ping you back soon.
          </p>
        </div>
        <CTAButton title="Back Home" link="/" theme="light" onClick={() => resetForm()} />
      </div>
    </div>
  )
}

const Contacts: FC = () => {
  const [formValues, setFormValues] = useState<FormValues>();
  const [isFormSent, setIsFormSent] = useState(false);
  const isFormValid = useMemo(() => (
    formValues?.name && formValues?.email
    && formValues.email.includes("@")
    && formValues.email.includes(".")
  ), [formValues])

  const onFieldChange = (target: Record<string, any>) => {
    setFormValues(prevState => ({ ...prevState, [target.name]: target.value }))
  }

  const onFormFinish = () => {
    sendMail(formValues)
      .then(() => setIsFormSent(true))
      .catch(() => setIsFormSent(false))
  }

  return (
    <DefaultLayout theme="dark" title="Contact">
      <Content className="contactPage">
        {isFormSent
          ? (
            <Success
              resetForm={() => {
                setFormValues(undefined)
                setIsFormSent(false)
              }}
            />
          )
          : (
            <>
              <Title level={2} className="contactPageTitle">Contact</Title>
              <div className="contactPageForm">
                <div className="contactPageFormWrapper">
                  <form className="contactForm">
                    <div className="inputWrapper">
                      <input
                        className={cx(Number(formValues?.name?.length) > 1 && 'valid')}
                        name="name"
                        type="text"
                        id="name"
                        minLength={2}
                        placeholder="your name"
                        onInput={({ target }) => onFieldChange(target)}
                      />
                      <label htmlFor="name">Hey guys, i’m</label>
                      <div className="line" />
                    </div>
                    <div className="inputWrapper">
                      <input
                        className={cx(Number(formValues?.email?.length) > 1
                          && formValues?.email?.includes("@")
                          && formValues?.email?.includes(".")
                          && 'valid'
                        )}
                        id="email"
                        name="email"
                        type="email"
                        minLength={2}
                        placeholder="email"
                        onInput={({ target }) => onFieldChange(target)}
                      />
                      <label htmlFor="email">You can reach me at</label>
                      <div className="line" />
                    </div>
                    <textarea
                      name='message'
                      rows={7}
                      onInput={({ target }) => onFieldChange(target)}
                      placeholder="A few words about the project" value={formValues?.message}
                    />
                  </form>
                  <div className={cx('formSubmission', isFormValid && 'formValid')}>
                    <CTAButton title="Send a bird" theme="light" onClick={() => isFormValid && onFormFinish()} />
                  </div>
                </div>
              </div>
            </>
          )
        }
      </Content>
    </DefaultLayout>
  )
}

export default Contacts
