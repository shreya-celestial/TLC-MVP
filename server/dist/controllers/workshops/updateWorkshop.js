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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
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
    const participants = (_b = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.participants) === null || _b === void 0 ? void 0 : _b.map((part) => {
        var _a;
        return {
            enrollment_id: part,
            workshop_id: (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id
        };
    });
    const variables = {
        id: req.params.id,
        concluding_date: (0, global_1.formatDate)(req.body.concluding_date),
        end_date: (0, global_1.formatDate)(req.body.end_date),
        start_date: (0, global_1.formatDate)(req.body.start_date),
        venue: (0, global_1.capitaliseStr)(req.body.venue),
        types: (0, global_1.capitaliseStr)(req.body.types),
        venue_city: (0, global_1.capitaliseStr)(req.body.venue_city),
        vols,
        leads,
        participants,
        workshop_id: null
    };
    const data = yield (0, getData_1.default)(mutations_1.updateWorkshopById, variables);
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_c = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _c === void 0 ? void 0 : _c.message
        });
    }
    const meeting = (_e = (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.meetings) === null || _e === void 0 ? void 0 : _e.map((meeting) => {
        return {
            id: {
                _eq: meeting
            }
        };
    });
    const meetingData = yield (0, getData_1.default)(mutations_1.updateWorkshopMeetings, {
        meeting,
        id: (_f = req === null || req === void 0 ? void 0 : req.params) === null || _f === void 0 ? void 0 : _f.id
    });
    if (meetingData === null || meetingData === void 0 ? void 0 : meetingData.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_g = meetingData === null || meetingData === void 0 ? void 0 : meetingData.errors[0]) === null || _g === void 0 ? void 0 : _g.message
        });
    }
    if ((_j = (_h = meetingData === null || meetingData === void 0 ? void 0 : meetingData.data) === null || _h === void 0 ? void 0 : _h.update_meetings) === null || _j === void 0 ? void 0 : _j.affected_rows) {
        return res.status(200).json({
            status: 'success',
            message: 'Workshop updated successfully!'
        });
    }
    return res.status(400).json({
        status: 'error',
        message: 'Something went wrong. Please try again later!'
    });
});
exports.default = updateWorkshop;
