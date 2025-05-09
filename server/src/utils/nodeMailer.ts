import { createTransport } from "nodemailer";

const authMail = {
  user: '8c7bc4002@smtp-brevo.com',
  pass: process.env.MAIL_API_KEY
}

const transporter = createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: authMail
})

export default transporter