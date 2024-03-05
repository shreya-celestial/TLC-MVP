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
const mutations_1 = require("../../gql/meetings/mutations");
const deleteMeetings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const ids = (_b = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.ids) === null || _b === void 0 ? void 0 : _b.map((id) => {
        return {
            id: {
                _eq: id
            }
        };
    });
    const data = yield (0, getData_1.default)(mutations_1.deleteMeetingsByPKs, { ids });
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_c = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _c === void 0 ? void 0 : _c.message
        });
    }
    if (!((_e = (_d = data === null || data === void 0 ? void 0 : data.data) === null || _d === void 0 ? void 0 : _d.delete_meetings) === null || _e === void 0 ? void 0 : _e.affected_rows)) {
        return res.status(400).json({
            status: 'error',
            message: 'Meetings not found at this moment. Please try again later.'
        });
    }
    return res.status(200).json({
        status: 'success',
        message: 'Meetings deleted successfully!'
    });
});
exports.default = deleteMeetings;
