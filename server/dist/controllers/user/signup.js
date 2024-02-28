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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getData_1 = __importDefault(require("../../utils/getData"));
const mutations_1 = require("../../gql/mutations");
const generateMail_1 = __importDefault(require("../../utils/generateMail"));
const nodeMailer_1 = __importDefault(require("../../utils/nodeMailer"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const mutation = mutations_1.InsertUserMutation;
    const encryptPass = crypto_js_1.default.AES.encrypt(req.body.password, process.env.CRYPTO_HASH_KEY || '');
    const variables = Object.assign(Object.assign({}, req.body), { dob: new Date().toISOString().split('T')[0], password: encryptPass.toString(), isVerified: false, token: jsonwebtoken_1.default.sign({ tempKey: encryptPass.toString() }, process.env.JWT_SECRET_KEY || '') });
    const data = yield (0, getData_1.default)(mutation, variables);
    console.log(data);
    if (!data.errors) {
        const mailOptions = {
            from: 'infotech@thelastcentre.com',
            to: req.body.email,
            subject: 'Verification of TLC Email',
            text: '',
            html: (0, generateMail_1.default)(`http://localhost:8080/user/verifyUser/${variables.token}`, req.body.name),
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
        message: (_a = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _a === void 0 ? void 0 : _a.message,
    });
});
exports.default = signup;
