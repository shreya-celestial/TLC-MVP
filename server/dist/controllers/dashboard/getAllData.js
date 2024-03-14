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
const queries_1 = require("../../gql/dashboard/queries");
const getAllData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    let date = new Date();
    date.setMonth(date.getMonth() - 7);
    const data = yield (0, getData_1.default)(queries_1.getDashboardData, {
        compareDate: date
    });
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_a = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _a === void 0 ? void 0 : _a.message
        });
    }
    const dataToSend = {
        volunteers: (_d = (_c = (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.users_aggregate) === null || _c === void 0 ? void 0 : _c.aggregate) === null || _d === void 0 ? void 0 : _d.count,
        workshops: (_g = (_f = (_e = data === null || data === void 0 ? void 0 : data.data) === null || _e === void 0 ? void 0 : _e.workshops_aggregate) === null || _f === void 0 ? void 0 : _f.aggregate) === null || _g === void 0 ? void 0 : _g.count,
        meetings: (_k = (_j = (_h = data === null || data === void 0 ? void 0 : data.data) === null || _h === void 0 ? void 0 : _h.meetings_aggregate) === null || _j === void 0 ? void 0 : _j.aggregate) === null || _k === void 0 ? void 0 : _k.count,
        enrollments: (_o = (_m = (_l = data === null || data === void 0 ? void 0 : data.data) === null || _l === void 0 ? void 0 : _l.enrollments_aggregate) === null || _m === void 0 ? void 0 : _m.aggregate) === null || _o === void 0 ? void 0 : _o.count,
        past_six_months_enrollments: [...(_p = data === null || data === void 0 ? void 0 : data.data) === null || _p === void 0 ? void 0 : _p.enrollments]
    };
    return res.status(200).json({
        status: "success",
        message: "Data fetched successfully!",
        data: dataToSend
    });
});
exports.default = getAllData;
