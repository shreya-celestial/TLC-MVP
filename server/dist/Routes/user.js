"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = __importDefault(require("../controllers/user/signup"));
const login_1 = __importDefault(require("../controllers/user/login"));
const verifyUser_1 = __importDefault(require("../controllers/user/verifyUser"));
const forgotPass_1 = __importDefault(require("../controllers/user/forgotPass"));
const verifyReset_1 = __importDefault(require("../controllers/user/verifyReset"));
const router = express_1.default.Router();
router.post('/signup', signup_1.default);
router.post('/login', login_1.default);
router.get('/verifyUser/:token', verifyUser_1.default);
router.post('/forgotPass', forgotPass_1.default);
router.get('/verifyReset/:token', verifyReset_1.default);
exports.default = router;
