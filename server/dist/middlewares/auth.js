"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const { authorization } = req === null || req === void 0 ? void 0 : req.headers;
    if (authorization) {
        let authToken = authorization.split('Bearer ');
        if ((authToken === null || authToken === void 0 ? void 0 : authToken.length) > 1) {
            authToken = authToken[1];
            try {
                const token = jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET_KEY || '');
                if (token === null || token === void 0 ? void 0 : token.email) {
                    return next();
                }
            }
            catch (err) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Token expired!'
                });
            }
        }
        return res.status(401).json({
            status: 'error',
            message: 'Please provide a valid authorization token!'
        });
    }
    return res.status(401).json({
        status: 'error',
        message: 'Please provide an authorization token!'
    });
};
exports.default = auth;
