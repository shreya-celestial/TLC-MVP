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
const getData_1 = __importDefault(require("../../utils/getData"));
const global_1 = require("../../utils/global");
const crypto_js_1 = __importDefault(require("crypto-js"));
const queries_1 = require("../../gql/enrollments/queries");
const verifyEnrolLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const { verify } = req.query;
    let ticket = verify;
    try {
        ticket = ticket.replaceAll(' ', '+');
        let ticketData = crypto_js_1.default.AES.decrypt((ticket), process.env.CRYPTO_TICKET || '').toString(crypto_js_1.default.enc.Utf8);
        if (ticketData) {
            ticketData = JSON.parse(ticketData);
            const data = yield (0, getData_1.default)(queries_1.verifyWithGeneratedLink, ticketData);
            if (data === null || data === void 0 ? void 0 : data.errors) {
                throw new Error((_a = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _a === void 0 ? void 0 : _a.message);
            }
            if (!((_c = (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.enrollment_link_tickets) === null || _c === void 0 ? void 0 : _c.length)) {
                return res.status(404).send(`Your link maybe broken or has already been used. Please try again sometime later or try logging in! <a href="${global_1.redirecting_url}">Go to safety!</a>`);
            }
            const created = new Date((_e = (_d = data === null || data === void 0 ? void 0 : data.data) === null || _d === void 0 ? void 0 : _d.enrollment_link_tickets[0]) === null || _e === void 0 ? void 0 : _e.created_at);
            const now = new Date();
            const diffTime = now.getTime() - created.getTime();
            const diffDays = Math.round(diffTime / (24 * 3600 * 1000));
            if (diffDays >= 1) {
                return res.status(400).send(`Invitation link expired! <a href="${global_1.redirecting_url}">Go to safety!</a>`);
            }
            return res.redirect(303, `${global_1.redirecting_url}/enrol?verify=${ticket}`);
        }
        throw new Error();
    }
    catch (err) {
        return res.status(400).send(`${err || 'Invalid link!'} <a href="${global_1.redirecting_url}">Go to safety!</a>`);
    }
});
exports.default = verifyEnrolLink;
