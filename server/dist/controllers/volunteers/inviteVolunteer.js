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
const crypto_js_1 = __importDefault(require("crypto-js"));
const mutations_1 = require("../../gql/volunteers/mutations");
const global_1 = require("../../utils/global");
const generateMail_1 = __importDefault(require("../../utils/generateMail"));
const nodeMailer_1 = __importDefault(require("../../utils/nodeMailer"));
const inviteVolunteer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const { email, name, isAdmin } = req.body;
    const isEmailAvailable = yield (0, getData_1.default)(queries_1.checkEmailAvailability, { email });
    if (isEmailAvailable === null || isEmailAvailable === void 0 ? void 0 : isEmailAvailable.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_a = isEmailAvailable === null || isEmailAvailable === void 0 ? void 0 : isEmailAvailable.errors[0]) === null || _a === void 0 ? void 0 : _a.message
        });
    }
    if ((_c = (_b = isEmailAvailable === null || isEmailAvailable === void 0 ? void 0 : isEmailAvailable.data) === null || _b === void 0 ? void 0 : _b.users) === null || _c === void 0 ? void 0 : _c.length) {
        return res.status(400).json({
            status: 'error',
            message: "Email already registered!"
        });
    }
    if (!((_e = (_d = isEmailAvailable === null || isEmailAvailable === void 0 ? void 0 : isEmailAvailable.data) === null || _d === void 0 ? void 0 : _d.Invitations) === null || _e === void 0 ? void 0 : _e.length)) {
        let token = crypto_js_1.default.AES.encrypt(email, process.env.CRYPTO_TICKET || '');
        token = token.toString();
        const variables = {
            name: (0, global_1.capitaliseStr)(name),
            email: email.toLowerCase(),
            token,
            isAdmin
        };
        const data = yield (0, getData_1.default)(mutations_1.newInvite, variables);
        if (data === null || data === void 0 ? void 0 : data.errors) {
            return res.status(400).json({
                status: 'error',
                message: (_f = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _f === void 0 ? void 0 : _f.message
            });
        }
        if ((_h = (_g = data === null || data === void 0 ? void 0 : data.data) === null || _g === void 0 ? void 0 : _g.insert_Invitations) === null || _h === void 0 ? void 0 : _h.affected_rows) {
            const body = "TLC invites you to be a volunteer for TLC.";
            const mailOptions = {
                from: 'infotech@thelastcentre.com',
                to: email,
                subject: 'TLC Invitation',
                text: '',
                html: (0, generateMail_1.default)(`https://tlc-mvp-server.vercel.app/volunteers/verifyInvite?invite=${token}`, name, 'Accept Invitation', body)
            };
            nodeMailer_1.default.sendMail(mailOptions, (err) => __awaiter(void 0, void 0, void 0, function* () {
                if (!err) {
                    return res.status(200).json({
                        status: 'success',
                        message: 'Invitation sent successfully!'
                    });
                }
                start_position: while (true) {
                    const deleteSentInvite = yield (0, getData_1.default)(mutations_1.deleteInvite, { email, token });
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
    const created = new Date((_k = (_j = isEmailAvailable === null || isEmailAvailable === void 0 ? void 0 : isEmailAvailable.data) === null || _j === void 0 ? void 0 : _j.Invitations[0]) === null || _k === void 0 ? void 0 : _k.created_at).toLocaleDateString();
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
    const data = yield (0, getData_1.default)(mutations_1.resendInvite, variables);
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_l = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _l === void 0 ? void 0 : _l.message
        });
    }
    if ((_o = (_m = data === null || data === void 0 ? void 0 : data.data) === null || _m === void 0 ? void 0 : _m.update_Invitations) === null || _o === void 0 ? void 0 : _o.affected_rows) {
        const body = "TLC invites you to be a volunteer for TLC.";
        const mailOptions = {
            from: 'infotech@thelastcentre.com',
            to: email,
            subject: 'TLC Invitation',
            text: '',
            html: (0, generateMail_1.default)(`https://tlc-mvp-server.vercel.app/volunteers/verifyInvite?invite=${token}`, name, 'Accept Invitation', body)
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
exports.default = inviteVolunteer;
