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
const queries_1 = require("../../gql/user/queries");
const mutations_1 = require("../../gql/user/mutations");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = require("bcrypt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: 'Please provide email and password!', status: 'error' });
    }
    const query = queries_1.getUserByEmail;
    const variables = {
        email,
    };
    const data = yield (0, getData_1.default)(query, variables);
    if (!(data === null || data === void 0 ? void 0 : data.data.users.length)) {
        return res
            .status(400)
            .json({ status: 'error', message: 'User does not exists!' });
    }
    const user = data === null || data === void 0 ? void 0 : data.data.users[0];
    const decryptedPass = yield (0, bcrypt_1.compare)(password, user === null || user === void 0 ? void 0 : user.password);
    if (!decryptedPass) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid Credentials',
        });
    }
    if (!user.isVerified) {
        return res.status(401).json({
            status: 'error',
            message: 'Email is not verified. Please follow instructions sent on mail',
        });
    }
    if (!user.isAdminVerified) {
        return res.status(403).json({
            status: 'error',
            message: 'Your account is not verified yet. Please contact your admin for more details.',
        });
    }
    let userToSend = JSON.parse(JSON.stringify(user));
    userToSend === null || userToSend === void 0 ? true : delete userToSend.password;
    const tokenObj = {
        email,
        isAdmin: user === null || user === void 0 ? void 0 : user.isAdmin
    };
    const token = jsonwebtoken_1.default.sign(tokenObj, process.env.JWT_SECRET_KEY || '', {
        expiresIn: '24h'
    });
    const updateUserStatus = yield (0, getData_1.default)(mutations_1.updateStatus, {
        email, isLoggedIn: token
    });
    userToSend = Object.assign(Object.assign({}, userToSend), { key: token });
    if ((_b = (_a = updateUserStatus === null || updateUserStatus === void 0 ? void 0 : updateUserStatus.data) === null || _a === void 0 ? void 0 : _a.update_users) === null || _b === void 0 ? void 0 : _b.affected_rows) {
        return res.status(200).json({ status: 'success', user: userToSend });
    }
    return res.status(400).json({ status: 'error', message: 'Something went wrong. Please try again later!' });
});
exports.default = login;
