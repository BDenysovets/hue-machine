import {send} from "@emailjs/browser";

const emailConfig = {
  serviceId: "service_qolk3zg",
  publicKey: "Le8AWZA91PNEd9VSB",
  contactTemplateId: "template_xxhpjyl",
}

const sendMail = (values: any): Promise<any> => {
  const data = { ...values }

  return send(emailConfig.serviceId, emailConfig.contactTemplateId, data, emailConfig.publicKey)
}

export { sendMail }
