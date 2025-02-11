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
const queries_1 = require("../../gql/enrollments/queries");
const global_1 = require("../../utils/global");
const mutations_1 = require("../../gql/enrollments/mutations");
const linkEnrollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
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
        const verifyData = yield (0, getData_1.default)(queries_1.verifyWithGeneratedLink, ticketData);
        if (verifyData === null || verifyData === void 0 ? void 0 : verifyData.errors) {
            return res.status(400).json({
                status: 'error',
                message: (_b = verifyData === null || verifyData === void 0 ? void 0 : verifyData.errors[0]) === null || _b === void 0 ? void 0 : _b.message,
            });
        }
        if (!((_d = (_c = verifyData === null || verifyData === void 0 ? void 0 : verifyData.data) === null || _c === void 0 ? void 0 : _c.enrollment_link_tickets) === null || _d === void 0 ? void 0 : _d.length)) {
            return res.status(404).json({
                status: 'error',
                message: 'Ticket sent does not exist. Please request admin for another link!',
            });
        }
        const created = new Date((_f = (_e = verifyData === null || verifyData === void 0 ? void 0 : verifyData.data) === null || _e === void 0 ? void 0 : _e.enrollment_link_tickets[0]) === null || _f === void 0 ? void 0 : _f.created_at);
        const now = new Date();
        const diffTime = now.getTime() - created.getTime();
        const diffDays = Math.round(diffTime / (24 * 3600 * 1000));
        if (diffDays >= 1) {
            return res.status(400).json({
                status: 'error',
                message: 'Ticket sent is expired. Please request admin for another link!',
            });
        }
        const children = (_h = (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.children) === null || _h === void 0 ? void 0 : _h.map((child) => {
            return {
                dob: (0, global_1.formatDate)(child.dob),
                gender: child.gender,
                name: (0, global_1.capitaliseStr)(child.name)
            };
        });
        const link_by = (_k = (_j = verifyData === null || verifyData === void 0 ? void 0 : verifyData.data) === null || _j === void 0 ? void 0 : _j.enrollment_link_tickets[0]) === null || _k === void 0 ? void 0 : _k.invited_by;
        const dataBody = Object.assign(Object.assign({}, req === null || req === void 0 ? void 0 : req.body), { enrolled_by: link_by ? link_by.toLowerCase() : null, state: (0, global_1.capitaliseStr)((_l = req === null || req === void 0 ? void 0 : req.body) === null || _l === void 0 ? void 0 : _l.state), name: (0, global_1.capitaliseStr)((_m = req === null || req === void 0 ? void 0 : req.body) === null || _m === void 0 ? void 0 : _m.name), email: (_p = (_o = req === null || req === void 0 ? void 0 : req.body) === null || _o === void 0 ? void 0 : _o.email) === null || _p === void 0 ? void 0 : _p.toLowerCase(), dob: (0, global_1.formatDate)((_q = req === null || req === void 0 ? void 0 : req.body) === null || _q === void 0 ? void 0 : _q.dob), children });
        const data = yield (0, getData_1.default)(mutations_1.addVolunteerEnrollment, dataBody);
        if (data === null || data === void 0 ? void 0 : data.errors) {
            return res.status(400).json({
                status: 'error',
                message: (_r = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _r === void 0 ? void 0 : _r.message
            });
        }
        if ((_t = (_s = data === null || data === void 0 ? void 0 : data.data) === null || _s === void 0 ? void 0 : _s.insert_enrollments) === null || _t === void 0 ? void 0 : _t.affected_rows) {
            return res.status(200).json({
                status: 'success',
                message: 'Enrollment inserted successfully'
            });
        }
        return res.status(400).json({
            status: 'error',
            message: 'Something went wrong. Please try again later!'
        });
    }
    catch (err) {
        return res.status(400).json({
            status: 'error',
            message: 'Ticket sent might not be valid. Please request admin for another link or try again later!'
        });
    }
});
exports.default = linkEnrollment;
