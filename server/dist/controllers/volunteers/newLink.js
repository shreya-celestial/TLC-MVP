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
const crypto_1 = require("crypto");
const crypto_js_1 = __importDefault(require("crypto-js"));
const getData_1 = __importDefault(require("../../utils/getData"));
const mutations_1 = require("../../gql/volunteers/mutations");
const global_1 = require("../../utils/global");
const newLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const ticket_id = (0, crypto_1.randomUUID)();
    const data = yield (0, getData_1.default)(mutations_1.createNewLinkId, { ticket_id });
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_a = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _a === void 0 ? void 0 : _a.message
        });
    }
    const ticketData = {
        ticket_id: (_c = (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.insert_link_tickets_one) === null || _c === void 0 ? void 0 : _c.ticket_id,
        created_at: (_e = (_d = data === null || data === void 0 ? void 0 : data.data) === null || _d === void 0 ? void 0 : _d.insert_link_tickets_one) === null || _e === void 0 ? void 0 : _e.created_at
    };
    try {
        let ticket = crypto_js_1.default.AES.encrypt(JSON.stringify(ticketData), process.env.CRYPTO_TICKET || '');
        ticket = ticket.toString();
        return res.status(200).json({
            status: 'success',
            message: 'Link generated successfully!',
            data: {
                link: `${global_1.mailing_url}/volunteers/verifyLink?verify=${ticket}`
            }
        });
    }
    catch (err) {
        return res.status(400).json({
            status: 'error',
            message: 'Something went wrong. Please try again!'
        });
    }
});
exports.default = newLink;
