"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirecting_url = exports.mailing_url = exports.formatDate = exports.capitaliseStr = void 0;
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
    return new Date(date).toISOString();
};
exports.formatDate = formatDate;
// For Development Mode
exports.mailing_url = 'http://localhost:8080';
exports.redirecting_url = 'http://localhost:3000';
// For Production Mode
// export const mailing_url = 'https://tlc-mvp-server.vercel.app';
// export const redirecting_url = 'https://tlc-mvp-app.vercel.app';
