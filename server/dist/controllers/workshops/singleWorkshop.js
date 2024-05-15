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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const { id } = req.params;
    const data = yield (0, getData_1.default)(queries_1.workshopDetails, { id });
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_a = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _a === void 0 ? void 0 : _a.message
        });
    }
    if ((_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.workshops_by_pk) {
        data.data.workshops_by_pk.workshop_lead_volunteers = (_d = (_c = data === null || data === void 0 ? void 0 : data.data) === null || _c === void 0 ? void 0 : _c.workshops_by_pk) === null || _d === void 0 ? void 0 : _d.workshop_lead_volunteers.map((lead) => {
            lead.user = Object.assign(Object.assign({}, lead.user), { responsibility: lead.responsibility });
            delete lead["responsibility"];
            return lead;
        });
        data.data.workshops_by_pk.workshop_volunteers = (_f = (_e = data === null || data === void 0 ? void 0 : data.data) === null || _e === void 0 ? void 0 : _e.workshops_by_pk) === null || _f === void 0 ? void 0 : _f.workshop_volunteers.map((vol) => {
            vol.user = Object.assign(Object.assign({}, vol.user), { responsibility: vol.responsibility });
            delete vol["responsibility"];
            return vol;
        });
        return res.status(200).json({
            status: 'success',
            message: "Data fetched successfully!",
            data: {
                workshop: Object.assign(Object.assign({}, (_g = data === null || data === void 0 ? void 0 : data.data) === null || _g === void 0 ? void 0 : _g.workshops_by_pk), { lead_volunteers_count: (_k = (_j = (_h = data === null || data === void 0 ? void 0 : data.data) === null || _h === void 0 ? void 0 : _h.workshops_by_pk) === null || _j === void 0 ? void 0 : _j.workshop_lead_volunteers) === null || _k === void 0 ? void 0 : _k.length, volunteers_count: (_o = (_m = (_l = data === null || data === void 0 ? void 0 : data.data) === null || _l === void 0 ? void 0 : _l.workshops_by_pk) === null || _m === void 0 ? void 0 : _m.workshop_volunteers) === null || _o === void 0 ? void 0 : _o.length })
            }
        });
    }
    return res.status(400).json({
        status: 'error',
        message: 'No workshop exists for the given id'
    });
});
exports.default = singleWorkshop;
