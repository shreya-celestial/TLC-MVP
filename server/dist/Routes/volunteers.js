"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const updateRole_1 = __importDefault(require("../controllers/volunteers/updateRole"));
const deleteVolunteer_1 = __importDefault(require("../controllers/volunteers/deleteVolunteer"));
const searchAndFilterVolunteer_1 = __importDefault(require("../controllers/volunteers/searchAndFilterVolunteer"));
const inviteVolunteer_1 = __importDefault(require("../controllers/volunteers/inviteVolunteer"));
const adminVerified_1 = __importDefault(require("../controllers/volunteers/adminVerified"));
const getSingleVolunteer_1 = __importDefault(require("../controllers/volunteers/getSingleVolunteer"));
const verifyInvite_1 = __importDefault(require("../controllers/volunteers/verifyInvite"));
const inviteSignup_1 = __importDefault(require("../controllers/volunteers/inviteSignup"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const adminAuth_1 = __importDefault(require("../middlewares/adminAuth"));
const newLink_1 = __importDefault(require("../controllers/volunteers/newLink"));
const verifyLink_1 = __importDefault(require("../controllers/volunteers/verifyLink"));
const linkSignup_1 = __importDefault(require("../controllers/volunteers/linkSignup"));
const router = express_1.default.Router();
// router.get('/', getAllVolunteers)
// router.get('/filters', getFilteredVolunteers)
router.get('/:email/details', auth_1.default, getSingleVolunteer_1.default);
router.get('/searchAndFilter', auth_1.default, searchAndFilterVolunteer_1.default);
router.put('/updateRole', adminAuth_1.default, updateRole_1.default);
router.delete('/', adminAuth_1.default, deleteVolunteer_1.default);
router.put('/adminVerified', adminAuth_1.default, adminVerified_1.default);
router.post('/invite', adminAuth_1.default, inviteVolunteer_1.default);
router.get('/link', adminAuth_1.default, newLink_1.default);
router.post('/linkSignup', linkSignup_1.default);
router.get('/verifyLink', verifyLink_1.default);
router.get('/verifyInvite', verifyInvite_1.default);
router.post('/inviteSignup', inviteSignup_1.default);
exports.default = router;
