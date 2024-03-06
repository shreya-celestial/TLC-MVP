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
const global_1 = require("../../utils/global");
const getData_1 = __importDefault(require("../../utils/getData"));
const mutations_1 = require("../../gql/workshops/mutations");
const newWorkshop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const vols = req.body.vols.map((vol) => {
        return {
            user_email: vol
        };
    });
    const leads = req.body.leads.map((lead) => {
        return {
            user_email: lead
        };
    });
    const variables = Object.assign(Object.assign({}, req.body), { concluding_date: (0, global_1.formatDate)(req.body.concluding_date), end_date: (0, global_1.formatDate)(req.body.end_date), start_date: (0, global_1.formatDate)(req.body.start_date), venue: (0, global_1.capitaliseStr)(req.body.venue), types: (0, global_1.capitaliseStr)(req.body.types), venue_city: (0, global_1.capitaliseStr)(req.body.venue_city), vols,
        leads });
    const data = yield (0, getData_1.default)(mutations_1.insertNewWorkshop, variables);
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_a = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _a === void 0 ? void 0 : _a.message
        });
    }
    if ((_c = (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.insert_workshops) === null || _c === void 0 ? void 0 : _c.affected_rows) {
        return res.status(200).json({
            status: 'success',
            message: "Workshop created successfully",
            workshop_id: (_f = (_e = (_d = data === null || data === void 0 ? void 0 : data.data) === null || _d === void 0 ? void 0 : _d.insert_workshops) === null || _e === void 0 ? void 0 : _e.returning[0]) === null || _f === void 0 ? void 0 : _f.id
        });
    }
    return res.status(400).json({
        status: 'error',
        message: 'Something went wrong. Please try again later!'
    });
});
exports.default = newWorkshop;
