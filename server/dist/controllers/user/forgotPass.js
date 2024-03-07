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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getData_1 = __importDefault(require("../../utils/getData"));
const mutations_1 = require("../../gql/user/mutations");
const generateMail_1 = __importDefault(require("../../utils/generateMail"));
const nodeMailer_1 = __importDefault(require("../../utils/nodeMailer"));
const forgotPass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const { email } = req.body;
    const token = jsonwebtoken_1.default.sign({ tempKey: email }, process.env.JWT_SECRET_KEY || '');
    const data = yield (0, getData_1.default)(mutations_1.CheckAndUpdateToken, {
        email: email,
        isVerified: true,
        token: token,
        isPassToBeReset: true,
        isAdminVerified: true
    });
    if ((_b = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.update_users) === null || _b === void 0 ? void 0 : _b.affected_rows) {
        const name = (_e = (_d = (_c = data === null || data === void 0 ? void 0 : data.data) === null || _c === void 0 ? void 0 : _c.update_users) === null || _d === void 0 ? void 0 : _d.returning[0]) === null || _e === void 0 ? void 0 : _e.name;
        const body = "Please click on this link below to reset your password.";
        const mailOptions = {
            from: 'infotech@thelastcentre.com',
            to: email,
            subject: 'Reset Password Link',
            text: '',
            html: (0, generateMail_1.default)(`https://tlc-two.vercel.app/user/verifyReset/${token}`, name, 'Reset Password', body)
        };
        nodeMailer_1.default.sendMail(mailOptions, (err) => {
            if (!err) {
                return res.status(200).json({
                    status: 'success',
                    message: 'Mail sent successfully!'
                });
            }
            return res.status(400).json({
                status: 'error',
                message: 'Something went wrong, Please try again!'
            });
        });
        return;
    }
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_f = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _f === void 0 ? void 0 : _f.message
        });
    }
    return res.status(404).json({
        status: 'error',
        message: 'User does not exists!'
    });
});
exports.default = forgotPass;
