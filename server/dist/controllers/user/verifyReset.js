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
const verifyReset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { token: invite } = req === null || req === void 0 ? void 0 : req.query;
    let token = invite;
    token = token === null || token === void 0 ? void 0 : token.replaceAll(' ', '+');
    if (token && token !== 'null' && token !== 'NULL') {
        const data = yield (0, getData_1.default)(queries_1.verifyResetQuery, {
            token: token
        });
        if ((_b = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.users) === null || _b === void 0 ? void 0 : _b.length) {
            return res.redirect(303, `https://tlc-mvp-app-amber.vercel.app/resetPass?reset=${token}`);
        }
        return res.status(400).send('Error! Something went wrong. Please try again later.');
    }
    return res.status(404).send('Error! Page not found.');
});
exports.default = verifyReset;
