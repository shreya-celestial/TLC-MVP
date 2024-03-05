"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newMeeting_1 = __importDefault(require("../controllers/meetings/newMeeting"));
const allPageMeetings_1 = __importDefault(require("../controllers/meetings/allPageMeetings"));
const getSingleMeeting_1 = __importDefault(require("../controllers/meetings/getSingleMeeting"));
const router = express_1.default.Router();
router.post('/', newMeeting_1.default);
router.get('/', allPageMeetings_1.default);
router.get('/:id/details', getSingleMeeting_1.default);
exports.default = router;
