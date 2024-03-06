"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAllVolunteers_1 = __importDefault(require("../controllers/volunteers/getAllVolunteers"));
const updateRole_1 = __importDefault(require("../controllers/volunteers/updateRole"));
const deleteVolunteer_1 = __importDefault(require("../controllers/volunteers/deleteVolunteer"));
const searchAndFilterVolunteer_1 = __importDefault(require("../controllers/volunteers/searchAndFilterVolunteer"));
const inviteVolunteer_1 = __importDefault(require("../controllers/volunteers/inviteVolunteer"));
const adminVerified_1 = __importDefault(require("../controllers/volunteers/adminVerified"));
const getSingleVolunteer_1 = __importDefault(require("../controllers/volunteers/getSingleVolunteer"));
const verifyInvite_1 = __importDefault(require("../controllers/volunteers/verifyInvite"));
const inviteSignup_1 = __importDefault(require("../controllers/volunteers/inviteSignup"));
const router = express_1.default.Router();
router.get('/', getAllVolunteers_1.default);
router.get('/:email/details', getSingleVolunteer_1.default);
// router.get('/filters', getFilteredVolunteers)
router.put('/updateRole', updateRole_1.default);
router.delete('/', deleteVolunteer_1.default);
router.get('/searchAndFilter', searchAndFilterVolunteer_1.default);
router.post('/invite', inviteVolunteer_1.default);
router.put('/adminVerified', adminVerified_1.default);
router.get('/verifyInvite/:token', verifyInvite_1.default);
router.post('/inviteSignup', inviteSignup_1.default);
exports.default = router;
