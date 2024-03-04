"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newWorkshop_1 = __importDefault(require("../controllers/workshops/newWorkshop"));
const router = express_1.default.Router();
router.post('/', newWorkshop_1.default);
exports.default = router;
