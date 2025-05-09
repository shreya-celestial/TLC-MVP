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
const queries_1 = require("../../gql/enrollments/queries");
const crypto_js_1 = __importDefault(require("crypto-js"));
const global_1 = require("../../utils/global");
const mutations_1 = require("../../gql/enrollments/mutations");
const generateMail_1 = __importDefault(require("../../utils/generateMail"));
const nodeMailer_1 = __importDefault(require("../../utils/nodeMailer"));
const inviteEnrollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const { email, mobile, name, invitedBy } = req === null || req === void 0 ? void 0 : req.body;
    const isEnrollmentAvailable = yield (0, getData_1.default)(queries_1.checkEnrollmentAvailability, { email });
    if (isEnrollmentAvailable === null || isEnrollmentAvailable === void 0 ? void 0 : isEnrollmentAvailable.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_a = isEnrollmentAvailable === null || isEnrollmentAvailable === void 0 ? void 0 : isEnrollmentAvailable.errors[0]) === null || _a === void 0 ? void 0 : _a.message,
        });
    }
    if ((_c = (_b = isEnrollmentAvailable === null || isEnrollmentAvailable === void 0 ? void 0 : isEnrollmentAvailable.data) === null || _b === void 0 ? void 0 : _b.enrollments) === null || _c === void 0 ? void 0 : _c.length) {
        return res.status(400).json({
            status: 'error',
            message: "Email already enrolled!"
        });
    }
    if (!((_e = (_d = isEnrollmentAvailable === null || isEnrollmentAvailable === void 0 ? void 0 : isEnrollmentAvailable.data) === null || _d === void 0 ? void 0 : _d.enrollment_invites) === null || _e === void 0 ? void 0 : _e.length)) {
        let token = crypto_js_1.default.AES.encrypt(email, process.env.CRYPTO_TICKET || '');
        token = token.toString();
        const variables = {
            name: (0, global_1.capitaliseStr)(name),
            email: email.toLowerCase(),
            token,
            mobile,
            invited_by: invitedBy ? invitedBy.toLowerCase() : null
        };
        const data = yield (0, getData_1.default)(mutations_1.newEnrollmentInvite, variables);
        if (data === null || data === void 0 ? void 0 : data.errors) {
            return res.status(400).json({
                status: 'error',
                message: (_f = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _f === void 0 ? void 0 : _f.message
            });
        }
        if ((_h = (_g = data === null || data === void 0 ? void 0 : data.data) === null || _g === void 0 ? void 0 : _g.insert_enrollment_invites) === null || _h === void 0 ? void 0 : _h.affected_rows) {
            const body = "TLC invites you to enrol at TLC.";
            const mailOptions = {
                from: 'thelastcentre.techinfo@gmail.com',
                to: email,
                subject: 'TLC Enrollment Invitation',
                text: '',
                html: (0, generateMail_1.default)(`${global_1.mailing_url}/enrollments/verifyInvite?invite=${token}`, name, 'Accept Invitation', body)
            };
            nodeMailer_1.default.sendMail(mailOptions, (err) => __awaiter(void 0, void 0, void 0, function* () {
                if (!err) {
                    return res.status(200).json({
                        status: 'success',
                        message: 'Invitation sent successfully!'
                    });
                }
                start_position: while (true) {
                    const deleteSentInvite = yield (0, getData_1.default)(mutations_1.deleteEnrollmentInvite, { email, token });
                    if (deleteSentInvite === null || deleteSentInvite === void 0 ? void 0 : deleteSentInvite.errors) {
                        continue start_position;
                    }
                    break;
                }
                return res.status(400).json({
                    status: 'error',
                    message: "Something went wrong! Please try again!"
                });
            }));
            return;
        }
        return res.status(400).json({
            status: 'error',
            message: "Something went wrong! Please try again!"
        });
    }
    const created = new Date((_k = (_j = isEnrollmentAvailable === null || isEnrollmentAvailable === void 0 ? void 0 : isEnrollmentAvailable.data) === null || _j === void 0 ? void 0 : _j.enrollment_invites[0]) === null || _k === void 0 ? void 0 : _k.created_at).toLocaleDateString();
    const today = new Date().toLocaleDateString();
    if (created === today) {
        return res.status(400).json({
            status: 'error',
            message: 'Invitation has already been sent today!'
        });
    }
    let token = crypto_js_1.default.AES.encrypt(email, process.env.CRYPTO_TICKET || '');
    token = token.toString();
    const variables = {
        email: email.toLowerCase(),
        token
    };
    const data = yield (0, getData_1.default)(mutations_1.resendEnrollmentInvite, variables);
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_l = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _l === void 0 ? void 0 : _l.message
        });
    }
    if ((_o = (_m = data === null || data === void 0 ? void 0 : data.data) === null || _m === void 0 ? void 0 : _m.update_enrollment_invites) === null || _o === void 0 ? void 0 : _o.affected_rows) {
        const body = "TLC invites you to enrol at TLC.";
        const mailOptions = {
            from: 'thelastcentre.techinfo@gmail.com',
            to: email,
            subject: 'TLC Enrollment Invitation',
            text: '',
            html: (0, generateMail_1.default)(`${global_1.mailing_url}/enrollments/verifyInvite?invite=${token}`, name, 'Accept Invitation', body)
        };
        nodeMailer_1.default.sendMail(mailOptions, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (!err) {
                return res.status(200).json({
                    status: 'success',
                    message: 'Invitation re-sent successfully!'
                });
            }
            return res.status(400).json({
                status: 'error',
                message: "Something went wrong! Please try again!"
            });
        }));
        return;
    }
    return res.status(400).json({
        status: 'error',
        message: "Something went wrong! Please try again!"
    });
});
exports.default = inviteEnrollment;
