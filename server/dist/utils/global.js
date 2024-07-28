"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirecting_url = exports.mailing_url = exports.formatDate = exports.capitaliseStr = void 0;
const moment_1 = __importDefault(require("moment"));
const capitaliseStr = (str) => {
    let s = str.trim().split('');
    let ans = '';
    for (let i = 0; i < s.length; i++) {
        if (i === 0 || s[i - 1] === ' ') {
            s[i] = s[i].toUpperCase();
        }
        else {
            s[i] = s[i].toLowerCase();
        }
        ans += s[i];
    }
    return ans;
};
exports.capitaliseStr = capitaliseStr;
const formatDate = (date) => {
    // return new Date(date).toISOString()
    return (0, moment_1.default)(new Date(date)).format('YYYY-MM-DD');
};
exports.formatDate = formatDate;
// For Development Mode
exports.mailing_url = 'http://localhost:8080';
exports.redirecting_url = 'http://localhost:3000';
// For Production Mode
// export const mailing_url = 'https://tlc-mvp-server.vercel.app';
// export const redirecting_url = 'https://tlc-mvp-app.vercel.app';
