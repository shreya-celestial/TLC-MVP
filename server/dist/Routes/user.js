"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = __importDefault(require("../controllers/user/signup"));
const verify_1 = __importDefault(require("../controllers/user/verify"));
const router = express_1.default.Router();
router.post('/signup', signup_1.default);
router.get('/verify/:token', verify_1.default);
exports.default = router;
