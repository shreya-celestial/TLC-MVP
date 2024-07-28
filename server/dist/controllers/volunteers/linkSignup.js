"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = __importDefault(require("crypto-js"));
const getData_1 = __importDefault(require("../../utils/getData"));
const mutations_1 = require("../../gql/user/mutations");
const generateMail_1 = __importDefault(require("../../utils/generateMail"));
const nodeMailer_1 = __importDefault(require("../../utils/nodeMailer"));
const global_1 = require("../../utils/global");
const bcrypt_1 = require("bcrypt");
const queries_1 = require("../../gql/volunteers/queries");
const mutations_2 = require("../../gql/volunteers/mutations");
const linkSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const { verify } = req.body;
    try {
        const ticket = verify.replaceAll(' ', '+');
        (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? true : delete _a.verify;
        let ticketData = crypto_js_1.default.AES.decrypt((ticket), process.env.CRYPTO_TICKET || '').toString(crypto_js_1.default.enc.Utf8);
        if (!ticketData) {
            return res.status(400).json({
                status: 'error',
                message: 'Ticket sent is not valid. Please request admin for another link!',
            });
        }
        ticketData = JSON.parse(ticketData);
        const verifyData = yield (0, getData_1.default)(queries_1.verifyRequestedLink, ticketData);
        if (verifyData === null || verifyData === void 0 ? void 0 : verifyData.errors) {
            return res.status(400).json({
                status: 'error',
                message: (_b = verifyData === null || verifyData === void 0 ? void 0 : verifyData.errors[0]) === null || _b === void 0 ? void 0 : _b.message,
            });
        }
        if (!((_d = (_c = verifyData === null || verifyData === void 0 ? void 0 : verifyData.data) === null || _c === void 0 ? void 0 : _c.link_tickets) === null || _d === void 0 ? void 0 : _d.length)) {
            return res.status(404).json({
                status: 'error',
                message: 'Ticket sent does not exist. Please request admin for another link!',
            });
        }
        const created = new Date((_f = (_e = verifyData === null || verifyData === void 0 ? void 0 : verifyData.data) === null || _e === void 0 ? void 0 : _e.link_tickets[0]) === null || _f === void 0 ? void 0 : _f.created_at);
        const now = new Date();
        const diffTime = now.getTime() - created.getTime();
        const diffDays = Math.round(diffTime / (24 * 3600 * 1000));
        if (diffDays >= 5) {
            return res.status(400).json({
                status: 'error',
                message: 'Ticket sent is expired. Please request admin for another link!',
            });
        }
        const mutation = mutations_2.signupFromLink;
        const encryptPass = yield (0, bcrypt_1.hash)(req.body.password, 12);
        let token = crypto_js_1.default.AES.encrypt((_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.email, process.env.CRYPTO_TICKET || '');
        token = token.toString();
        const variables = Object.assign(Object.assign({}, req.body), { name: (0, global_1.capitaliseStr)(req.body.name), state: (0, global_1.capitaliseStr)(req.body.state), location: (0, global_1.capitaliseStr)(req.body.location), city: (0, global_1.capitaliseStr)(req.body.city), email: (req.body.email).toLowerCase(), dob: (0, global_1.formatDate)(req.body.dob), password: encryptPass, isVerified: false, isAdminVerified: true, isAdmin: false, created_at: ticketData === null || ticketData === void 0 ? void 0 : ticketData.created_at, ticket_id: ticketData === null || ticketData === void 0 ? void 0 : ticketData.ticket_id, token });
        const data = yield (0, getData_1.default)(mutation, variables);
        if (!data.errors) {
            const mailOptions = {
                from: 'infotech@thelastcentre.com',
                to: req.body.email,
                subject: 'Verification of TLC Email',
                text: '',
                html: (0, generateMail_1.default)(`${global_1.mailing_url}/user/verifyUser?token=${variables.token}`, (0, global_1.capitaliseStr)(req.body.name)),
            };
            nodeMailer_1.default.sendMail(mailOptions, (err) => __awaiter(void 0, void 0, void 0, function* () {
                if (!err) {
                    return res.status(200).json({
                        status: 'success',
                        message: 'Mail sent successfully!',
                    });
                }
                yield (0, getData_1.default)(mutations_1.DeleteUserByEmail, {
                    email: req.body.email,
                });
                return res.status(400).json({
                    status: 'error',
                    message: 'Something went wrong, Please try again!',
                });
            }));
            return;
        }
        return res.status(400).json({
            status: 'error',
            message: (_h = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _h === void 0 ? void 0 : _h.message,
        });
    }
    catch (err) {
        return res.status(400).json({
            status: 'error',
            message: 'Ticket sent might not be valid. Please request admin for another link or try again later!'
        });
    }
});
exports.default = linkSignup;
