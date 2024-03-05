import express from "express";
import newEnrollment from "../controllers/enrollments/newEnrollment";
import allPageEnrollments from "../controllers/enrollments/allPageEnrollments";
import singleEnrollment from "../controllers/enrollments/singleEnrollment";
import updateEnrollment from "../controllers/enrollments/updateEnrollment";
import deleteEnrollments from "../controllers/enrollments/deleteEnrollments";

const router = express.Router();

router.post('/', newEnrollment)
router.get('/', allPageEnrollments)
router.get('/:id/details', singleEnrollment)
router.put('/:id/edit', updateEnrollment)
router.delete('/', deleteEnrollments)

export default router