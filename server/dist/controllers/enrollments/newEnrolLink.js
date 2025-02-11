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
const queries_1 = require("../../gql/volunteers/queries");
const crypto_1 = require("crypto");
const mutations_1 = require("../../gql/enrollments/mutations");
const crypto_js_1 = __importDefault(require("crypto-js"));
const global_1 = require("../../utils/global");
const newEnrolLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const { linkBy } = req === null || req === void 0 ? void 0 : req.query;
    if (linkBy) {
        const data = yield (0, getData_1.default)(queries_1.VolunteerByEmail, { email: linkBy });
        if (!((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.users.length))
            return res.status(404).json({
                status: 'error',
                message: 'Requesting Volunteer not found!'
            });
        const ticket_id = (0, crypto_1.randomUUID)();
        const dbTicketData = yield (0, getData_1.default)(mutations_1.generateNewLinkId, { ticket_id, invited_by: linkBy });
        if (dbTicketData === null || dbTicketData === void 0 ? void 0 : dbTicketData.errors)
            return res.status(400).json({
                status: 'error',
                message: (_b = dbTicketData === null || dbTicketData === void 0 ? void 0 : dbTicketData.errors[0]) === null || _b === void 0 ? void 0 : _b.message
            });
        const ticketData = {
            ticket_id: (_d = (_c = dbTicketData === null || dbTicketData === void 0 ? void 0 : dbTicketData.data) === null || _c === void 0 ? void 0 : _c.insert_enrollment_link_tickets_one) === null || _d === void 0 ? void 0 : _d.ticket_id,
            created_at: (_f = (_e = dbTicketData === null || dbTicketData === void 0 ? void 0 : dbTicketData.data) === null || _e === void 0 ? void 0 : _e.insert_enrollment_link_tickets_one) === null || _f === void 0 ? void 0 : _f.created_at
        };
        try {
            let ticket = crypto_js_1.default.AES.encrypt(JSON.stringify(ticketData), process.env.CRYPTO_TICKET || '');
            ticket = ticket.toString();
            return res.status(200).json({
                status: 'success',
                message: 'Link generated successfully!',
                data: {
                    link: `${global_1.mailing_url}/enrollments/verifyEnrolLink?verify=${ticket}`
                }
            });
        }
        catch (err) {
            return res.status(400).json({
                status: 'error',
                message: 'Something went wrong. Please try again!'
            });
        }
    }
    return res.status(400).json({
        status: 'error',
        message: 'Please provide your email for Enrollment Invitation!'
    });
});
exports.default = newEnrolLink;
