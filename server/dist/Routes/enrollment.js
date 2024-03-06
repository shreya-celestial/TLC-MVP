"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newEnrollment_1 = __importDefault(require("../controllers/enrollments/newEnrollment"));
const allPageEnrollments_1 = __importDefault(require("../controllers/enrollments/allPageEnrollments"));
const singleEnrollment_1 = __importDefault(require("../controllers/enrollments/singleEnrollment"));
const updateEnrollment_1 = __importDefault(require("../controllers/enrollments/updateEnrollment"));
const deleteEnrollments_1 = __importDefault(require("../controllers/enrollments/deleteEnrollments"));
const router = express_1.default.Router();
router.post('/', newEnrollment_1.default);
router.get('/', allPageEnrollments_1.default);
router.get('/:id/details', singleEnrollment_1.default);
router.put('/:id/edit', updateEnrollment_1.default);
router.delete('/', deleteEnrollments_1.default);
exports.default = router;
