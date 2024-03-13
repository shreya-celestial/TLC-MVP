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
    var _a, _b, _c;
    if (req.params.token && req.params.token !== 'null' && req.params.token !== 'NULL') {
        const data = yield (0, getData_1.default)(mutations_1.VerifyTokenAndUpdate, {
            token: req.params.token,
            updatedToken: null,
            isVerified: true
        });
        if (data === null || data === void 0 ? void 0 : data.errors) {
            return res.status(400).send('Error! Please try again later.');
        }
        if (((_c = (_b = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.update_users) === null || _b === void 0 ? void 0 : _b.returning) === null || _c === void 0 ? void 0 : _c.length) === 0) {
            return res.status(100).send('It seems that your link has been used. Please login and continue.');
        }
        return res.redirect(303, 'https://tlc-mvp-app-amber.vercel.app/');
    }
    return res.status(404).send('Error! Page not found.');
});
exports.default = verifyUser;
