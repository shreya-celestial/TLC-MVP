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
const resetPass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const cookieStr = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.cookies;
    const cookies = cookieStr === null || cookieStr === void 0 ? void 0 : cookieStr.split('; ');
    let tokenCookie = cookies === null || cookies === void 0 ? void 0 : cookies.find((cookie) => (cookie.split('token=').length > 1));
    tokenCookie = tokenCookie === null || tokenCookie === void 0 ? void 0 : tokenCookie.split('token=')[1];
    const password = crypto_js_1.default.AES.encrypt(req.body.password, process.env.CRYPTO_HASH_KEY || '');
    const variables = {
        token: tokenCookie,
        password: password.toString(),
        tokenUpdated: null,
        isPassToBeReset: false
    };
    const data = yield (0, getData_1.default)(mutations_1.VerifyAndUpdatePass, variables);
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.clearCookie('token').status(400).json({
            status: 'error',
            message: (_b = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _b === void 0 ? void 0 : _b.message,
        });
    }
    if (!((_d = (_c = data === null || data === void 0 ? void 0 : data.data) === null || _c === void 0 ? void 0 : _c.update_users) === null || _d === void 0 ? void 0 : _d.affected_rows)) {
        return res.clearCookie('token').status(400).json({
            status: 'error',
            message: 'User not found!',
        });
    }
    return res.clearCookie('token').status(200).json({
        status: 'success',
        message: 'Password reset successful!'
    });
});
exports.default = resetPass;
