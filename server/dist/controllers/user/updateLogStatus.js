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
const mutations_1 = require("../../gql/user/mutations");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const updateLogStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const { authorization } = req === null || req === void 0 ? void 0 : req.headers;
    let token;
    if (!authorization) {
        return res.status(401).json({
            status: 'error',
            message: 'Please provide an authorization token!'
        });
    }
    let authToken = authorization.split('Bearer ');
    if ((authToken === null || authToken === void 0 ? void 0 : authToken.length) <= 1) {
        return res.status(401).json({
            status: 'error',
            message: 'Please provide a valid authorization token!'
        });
    }
    authToken = authToken[1];
    try {
        token = jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET_KEY || '');
    }
    catch (err) {
        return res.status(401).json({
            status: 'error',
            message: 'Token expired! Please login again.'
        });
    }
    let updatedToken;
    if (((token === null || token === void 0 ? void 0 : token.exp) - (new Date()).getSeconds()) > 30 * 1000) {
        updatedToken = authToken;
    }
    else {
        const tokenObj = {
            email: token === null || token === void 0 ? void 0 : token.email,
            isAdmin: token === null || token === void 0 ? void 0 : token.isAdmin
        };
        updatedToken = jsonwebtoken_1.default.sign(tokenObj, process.env.JWT_SECRET_KEY || '', {
            expiresIn: '24h'
        });
    }
    let isLoggedIn = updatedToken;
    const { isLoggingOut } = req === null || req === void 0 ? void 0 : req.body;
    if (isLoggingOut) {
        isLoggedIn = null;
    }
    const data = yield (0, getData_1.default)(mutations_1.verifyAndUpdateKey, {
        email: token === null || token === void 0 ? void 0 : token.email, key: authToken, isLoggedIn
    });
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_a = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _a === void 0 ? void 0 : _a.message
        });
    }
    if (!((_c = (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.update_users) === null || _c === void 0 ? void 0 : _c.affected_rows)) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found at this moment. Please try logging in again!'
        });
    }
    if (isLoggingOut) {
        return res.status(200).json({
            status: 'success',
            message: 'User successfully logged out!'
        });
    }
    let updateTokenObj;
    try {
        updateTokenObj = jsonwebtoken_1.default.verify(updatedToken, process.env.JWT_SECRET_KEY || '');
    }
    catch (err) {
        return res.status(401).json({
            status: 'error',
            message: 'Token expired! Please login again.'
        });
    }
    if (((_f = (_e = (_d = data === null || data === void 0 ? void 0 : data.data) === null || _d === void 0 ? void 0 : _d.update_users) === null || _e === void 0 ? void 0 : _e.returning[0]) === null || _f === void 0 ? void 0 : _f.isAdmin) === (updateTokenObj === null || updateTokenObj === void 0 ? void 0 : updateTokenObj.isAdmin)) {
        let userToSend = Object.assign(Object.assign({}, (_h = (_g = data === null || data === void 0 ? void 0 : data.data) === null || _g === void 0 ? void 0 : _g.update_users) === null || _h === void 0 ? void 0 : _h.returning[0]), { key: updatedToken });
        return res.status(200).json({
            status: 'success',
            message: 'User still logged in!',
            user: userToSend
        });
    }
    const tokenObj = {
        email: updateTokenObj === null || updateTokenObj === void 0 ? void 0 : updateTokenObj.email,
        isAdmin: (_l = (_k = (_j = data === null || data === void 0 ? void 0 : data.data) === null || _j === void 0 ? void 0 : _j.update_users) === null || _k === void 0 ? void 0 : _k.returning[0]) === null || _l === void 0 ? void 0 : _l.isAdmin
    };
    const updatedRoleToken = jsonwebtoken_1.default.sign(tokenObj, process.env.JWT_SECRET_KEY || '', {
        expiresIn: '24h'
    });
    const roleData = yield (0, getData_1.default)(mutations_1.verifyAndUpdateKey, {
        email: updateTokenObj === null || updateTokenObj === void 0 ? void 0 : updateTokenObj.email, key: updatedToken, isLoggedIn: updatedRoleToken
    });
    if (roleData === null || roleData === void 0 ? void 0 : roleData.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_m = roleData === null || roleData === void 0 ? void 0 : roleData.errors[0]) === null || _m === void 0 ? void 0 : _m.message
        });
    }
    if (!((_p = (_o = roleData === null || roleData === void 0 ? void 0 : roleData.data) === null || _o === void 0 ? void 0 : _o.update_users) === null || _p === void 0 ? void 0 : _p.affected_rows)) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found at this moment. Please try logging in again!'
        });
    }
    let userToSend = Object.assign(Object.assign({}, (_r = (_q = roleData === null || roleData === void 0 ? void 0 : roleData.data) === null || _q === void 0 ? void 0 : _q.update_users) === null || _r === void 0 ? void 0 : _r.returning[0]), { key: updatedRoleToken });
    return res.status(200).json({
        status: 'success',
        message: 'User still logged in!',
        user: userToSend
    });
});
exports.default = updateLogStatus;
