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
const queries_1 = require("../../gql/workshops/queries");
const global_1 = require("../../utils/global");
const dropdownWorkshops = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const { past, search } = req === null || req === void 0 ? void 0 : req.query;
    let variables = {};
    if (past && +past >= 0) {
        variables = Object.assign(Object.assign({}, variables), { limit: +past });
    }
    else {
        return res.status(400).json({
            status: 'error',
            message: !past ? 'Please provide a value for past workshops' : 'Please provide a valid value for past workshops'
        });
    }
    if (search) {
        let val = search;
        val = (0, global_1.capitaliseStr)(val);
        variables = Object.assign(Object.assign({}, variables), { search: `${val}%` });
    }
    const data = yield (0, getData_1.default)(queries_1.workshopsDD, variables);
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_a = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _a === void 0 ? void 0 : _a.message
        });
    }
    let pastwkshps = [];
    if ((_c = (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.past) === null || _c === void 0 ? void 0 : _c.length) {
        while ((_e = (_d = data === null || data === void 0 ? void 0 : data.data) === null || _d === void 0 ? void 0 : _d.past) === null || _e === void 0 ? void 0 : _e.length) {
            pastwkshps.push((_g = (_f = data === null || data === void 0 ? void 0 : data.data) === null || _f === void 0 ? void 0 : _f.past) === null || _g === void 0 ? void 0 : _g.pop());
        }
    }
    return res.status(200).json({
        status: "success",
        message: "Data fetched successfully!",
        data: {
            workshops: {
                past: pastwkshps,
                upcoming: (_h = data === null || data === void 0 ? void 0 : data.data) === null || _h === void 0 ? void 0 : _h.upcoming
            }
        }
    });
});
exports.default = dropdownWorkshops;
