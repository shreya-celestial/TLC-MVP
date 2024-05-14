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
const global_1 = require("../../utils/global");
const getData_1 = __importDefault(require("../../utils/getData"));
const mutations_1 = require("../../gql/enrollments/mutations");
const queries_1 = require("../../gql/enrollments/queries");
const newEnrollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    if (req.body.token && req.body.token !== 'null' && req.body.token !== 'NULL') {
        const verifyEmail = yield (0, getData_1.default)(queries_1.verifyEnrollmentsInvite, { token: req.body.token });
        if (verifyEmail === null || verifyEmail === void 0 ? void 0 : verifyEmail.errors) {
            return res.status(400).json({
                status: 'error',
                message: (_a = verifyEmail === null || verifyEmail === void 0 ? void 0 : verifyEmail.errors[0]) === null || _a === void 0 ? void 0 : _a.message
            });
        }
        if (!((_c = (_b = verifyEmail === null || verifyEmail === void 0 ? void 0 : verifyEmail.data) === null || _b === void 0 ? void 0 : _b.enrollment_invites) === null || _c === void 0 ? void 0 : _c.length)) {
            return res.status(404).json({
                status: 'error',
                message: "Invitation doesn't exist."
            });
        }
        if (((_e = (_d = verifyEmail === null || verifyEmail === void 0 ? void 0 : verifyEmail.data) === null || _d === void 0 ? void 0 : _d.enrollment_invites[0]) === null || _e === void 0 ? void 0 : _e.email) !== (req.body.email.replace('%40', '@')).toLowerCase()) {
            return res.status(404).json({
                status: 'error',
                message: "Invitation doesn't exist for the given email."
            });
        }
        const children = (_g = (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.children) === null || _g === void 0 ? void 0 : _g.map((child) => {
            return {
                dob: (0, global_1.formatDate)(child.dob),
                gender: child.gender,
                name: (0, global_1.capitaliseStr)(child.name)
            };
        });
        const inviteData = (_h = verifyEmail === null || verifyEmail === void 0 ? void 0 : verifyEmail.data) === null || _h === void 0 ? void 0 : _h.enrollment_invites[0];
        const variables = Object.assign(Object.assign({}, req === null || req === void 0 ? void 0 : req.body), { enrolled_by: (inviteData === null || inviteData === void 0 ? void 0 : inviteData.invited_by) ? (inviteData === null || inviteData === void 0 ? void 0 : inviteData.invited_by).toLowerCase() : null, mobile_number: inviteData === null || inviteData === void 0 ? void 0 : inviteData.mobile_number, state: (0, global_1.capitaliseStr)((_j = req === null || req === void 0 ? void 0 : req.body) === null || _j === void 0 ? void 0 : _j.state), name: (0, global_1.capitaliseStr)(inviteData === null || inviteData === void 0 ? void 0 : inviteData.name), email: (inviteData === null || inviteData === void 0 ? void 0 : inviteData.email).toLowerCase(), token: req.body.token, children });
        const data = yield (0, getData_1.default)(mutations_1.addEnrollment, variables);
        if (data === null || data === void 0 ? void 0 : data.errors) {
            return res.status(400).json({
                status: 'error',
                message: (_k = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _k === void 0 ? void 0 : _k.message
            });
        }
        if (((_m = (_l = data === null || data === void 0 ? void 0 : data.data) === null || _l === void 0 ? void 0 : _l.insert_enrollments) === null || _m === void 0 ? void 0 : _m.affected_rows) && ((_p = (_o = data === null || data === void 0 ? void 0 : data.data) === null || _o === void 0 ? void 0 : _o.delete_enrollment_invites) === null || _p === void 0 ? void 0 : _p.affected_rows)) {
            return res.status(200).json({
                status: 'success',
                message: "User enrolled successfully!"
            });
        }
        return res.status(400).json({
            status: 'error',
            message: "Something went wrong. Please try again later!"
        });
    }
    return res.status(400).json({
        status: 'error',
        message: "Invalid Enrollment Invitation!"
    });
});
exports.default = newEnrollment;
