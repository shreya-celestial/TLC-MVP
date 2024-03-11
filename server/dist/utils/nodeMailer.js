"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const authMail = {
    user: 'infotech@thelastcentre.com',
    pass: process.env.MAIL_API_KEY
};
const transporter = (0, nodemailer_1.createTransport)({
    authMethod: 'PLAIN',
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: authMail
});
exports.default = transporter;
