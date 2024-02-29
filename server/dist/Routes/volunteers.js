"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAllVolunteers_1 = __importDefault(require("../controllers/volunteers/getAllVolunteers"));
const filteredVolunteers_1 = __importDefault(require("../controllers/volunteers/filteredVolunteers"));
const router = express_1.default.Router();
router.get('/', getAllVolunteers_1.default);
router.get('/filters', filteredVolunteers_1.default);
exports.default = router;
