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
const updateWorkshop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const vols = req.body.vols.map((vol) => {
        var _a;
        return {
            user_email: vol,
            workshop_id: (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id
        };
    });
    const leads = req.body.leads.map((lead) => {
        var _a;
        return {
            user_email: lead,
            workshop_id: (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id
        };
    });
    const variables = Object.assign(Object.assign({}, req.body), { id: req.params.id, concluding_date: (0, global_1.formatDate)(req.body.concluding_date), end_date: (0, global_1.formatDate)(req.body.end_date), start_date: (0, global_1.formatDate)(req.body.start_date), venue: (0, global_1.capitaliseStr)(req.body.venue), types: (0, global_1.capitaliseStr)(req.body.types), venue_city: (0, global_1.capitaliseStr)(req.body.venue_city), vols,
        leads });
    const data = yield (0, getData_1.default)(mutations_1.updateWorkshopById, variables);
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_a = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _a === void 0 ? void 0 : _a.message
        });
    }
    return res.status(200).json({
        status: 'success',
        message: 'Workshop updated successfully!'
    });
});
exports.default = updateWorkshop;
