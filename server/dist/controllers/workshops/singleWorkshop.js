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
const singleWorkshop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const { id } = req.params;
    const data = yield (0, getData_1.default)(queries_1.workshopDetails, { id });
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_a = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _a === void 0 ? void 0 : _a.message
        });
    }
    if ((_c = (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.workshops) === null || _c === void 0 ? void 0 : _c.length) {
        return res.status(200).json({
            status: 'success',
            message: "Data fetched successfully!",
            data: {
                workshop: Object.assign(Object.assign({}, (_d = data === null || data === void 0 ? void 0 : data.data) === null || _d === void 0 ? void 0 : _d.workshops[0]), { lead_volunteers_count: (_g = (_f = (_e = data === null || data === void 0 ? void 0 : data.data) === null || _e === void 0 ? void 0 : _e.workshops[0]) === null || _f === void 0 ? void 0 : _f.workshop_lead_volunteers) === null || _g === void 0 ? void 0 : _g.length, volunteers_count: (_k = (_j = (_h = data === null || data === void 0 ? void 0 : data.data) === null || _h === void 0 ? void 0 : _h.workshops[0]) === null || _j === void 0 ? void 0 : _j.workshop_volunteers) === null || _k === void 0 ? void 0 : _k.length })
            }
        });
    }
    return res.status(400).json({
        status: 'error',
        message: 'No workshop exists for the given id'
    });
});
exports.default = singleWorkshop;
