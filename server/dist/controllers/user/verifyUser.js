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
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { token: invite } = req === null || req === void 0 ? void 0 : req.query;
    let token = invite;
    token = token === null || token === void 0 ? void 0 : token.replaceAll(' ', '+');
    if (token && token !== 'null' && token !== 'NULL') {
        const data = yield (0, getData_1.default)(mutations_1.VerifyTokenAndUpdate, {
            token: token,
            updatedToken: null,
            isVerified: true
        });
        if (data === null || data === void 0 ? void 0 : data.errors) {
            return res.status(400).send('Error! Please try again later. <a href="https://tlc-mvp-app-amber.vercel.app">Go to safety!</a>');
        }
        if (!((_b = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.update_users) === null || _b === void 0 ? void 0 : _b.affected_rows)) {
            return res.status(400).send('It seems that your link has been used. Please login and continue. <a href="https://tlc-mvp-app-amber.vercel.app">Go to safety!</a>');
        }
        return res.redirect(303, 'https://tlc-mvp-app-amber.vercel.app/');
    }
    return res.status(404).send('Error! Page not found. <a href="https://tlc-mvp-app-amber.vercel.app">Go to safety!</a>');
});
exports.default = verifyUser;
