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
const verifyInvite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    const { invite } = req.query;
    let token = invite;
    token = token === null || token === void 0 ? void 0 : token.replaceAll(' ', '+');
    if (token && token !== 'null' && token !== 'NULL') {
        const data = yield (0, getData_1.default)(queries_1.verifyVolunteerInvite, { token });
        if (data === null || data === void 0 ? void 0 : data.errors) {
            return res.status(404).send((_a = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _a === void 0 ? void 0 : _a.message);
        }
        if (!((_c = (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.Invitations) === null || _c === void 0 ? void 0 : _c.length)) {
            return res.status(404).send('Your link maybe broken or has already been used. Please try again sometime later or try logging in!');
        }
        const created = new Date((_e = (_d = data === null || data === void 0 ? void 0 : data.data) === null || _d === void 0 ? void 0 : _d.Invitations[0]) === null || _e === void 0 ? void 0 : _e.created_at);
        const now = new Date();
        const diffTime = now.getTime() - created.getTime();
        const diffDays = Math.round(diffTime / (24 * 3600 * 1000));
        if (diffDays >= 5) {
            return res.status(404).send('Invitation expired!');
        }
        return res.redirect(303, `https://tlc-mvp-app-amber.vercel.app/signup?ticket=${token}&for=${(_g = (_f = data === null || data === void 0 ? void 0 : data.data) === null || _f === void 0 ? void 0 : _f.Invitations[0]) === null || _g === void 0 ? void 0 : _g.email}`);
    }
    return res.status(404).send('Error! Page not found.');
});
exports.default = verifyInvite;
