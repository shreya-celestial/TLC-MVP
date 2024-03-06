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
const mutations_1 = require("../../gql/meetings/mutations");
const editMeeting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    const enrollments = (_b = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.enrollments) === null || _b === void 0 ? void 0 : _b.map((enrl) => {
        return {
            enrollment_id: enrl,
            meeting_id: id
        };
    });
    const volunteers = (_d = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.volunteers) === null || _d === void 0 ? void 0 : _d.map((vol) => {
        return {
            volunteer_email: vol,
            meeting_id: id
        };
    });
    const variables = {
        date: (0, global_1.formatDate)((_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.date),
        type: (0, global_1.capitaliseStr)((_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.type),
        venue: (0, global_1.capitaliseStr)((_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.venue),
        venue_city: (0, global_1.capitaliseStr)((_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.venue_city),
        workshop_id: ((_j = req === null || req === void 0 ? void 0 : req.body) === null || _j === void 0 ? void 0 : _j.workshop_id) || null,
        enrollments: enrollments,
        vols: volunteers,
        id
    };
    const data = yield (0, getData_1.default)(mutations_1.updateMeeting, variables);
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_k = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _k === void 0 ? void 0 : _k.message
        });
    }
    if ((_m = (_l = data === null || data === void 0 ? void 0 : data.data) === null || _l === void 0 ? void 0 : _l.update_meetings) === null || _m === void 0 ? void 0 : _m.affected_rows) {
        return res.status(200).json({
            status: 'success',
            message: 'Meeting updated successfully'
        });
    }
    return res.status(400).json({
        status: 'error',
        message: 'Something went wrong. Please try again later!'
    });
});
exports.default = editMeeting;
