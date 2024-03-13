import { createTransport } from "nodemailer";

const authMail = {
  user: 'infotech@thelastcentre.com',
  pass: process.env.MAIL_API_KEY
}

const transporter = createTransport({
  authMethod: 'PLAIN',
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: authMail
})

export default transporter