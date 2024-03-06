"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newWorkshop_1 = __importDefault(require("../controllers/workshops/newWorkshop"));
const allPageWorkshops_1 = __importDefault(require("../controllers/workshops/allPageWorkshops"));
const singleWorkshop_1 = __importDefault(require("../controllers/workshops/singleWorkshop"));
const updateWorkshop_1 = __importDefault(require("../controllers/workshops/updateWorkshop"));
const deleteWorkshop_1 = __importDefault(require("../controllers/workshops/deleteWorkshop"));
const router = express_1.default.Router();
router.post('/', newWorkshop_1.default);
router.get('/', allPageWorkshops_1.default);
router.get('/:id/details', singleWorkshop_1.default);
router.put('/:id/update', updateWorkshop_1.default);
router.delete('/', deleteWorkshop_1.default);
exports.default = router;
