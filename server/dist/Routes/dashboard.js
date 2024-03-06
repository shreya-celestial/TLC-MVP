"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAllData_1 = __importDefault(require("../controllers/dashboard/getAllData"));
const router = express_1.default.Router();
router.get('/', getAllData_1.default);
exports.default = router;
