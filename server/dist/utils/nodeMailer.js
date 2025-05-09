"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const authMail = {
    user: '8c7bc4002@smtp-brevo.com',
    pass: process.env.MAIL_API_KEY
};
const transporter = (0, nodemailer_1.createTransport)({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: authMail
});
exports.default = transporter;
