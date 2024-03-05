import express from "express";
import newEnrollment from "../controllers/enrollments/newEnrollment";
import allPageEnrollments from "../controllers/enrollments/allPageEnrollments";
import singleEnrollment from "../controllers/enrollments/singleEnrollment";

const router = express.Router();

router.post('/', newEnrollment)
router.get('/', allPageEnrollments)
router.get('/:id/details', singleEnrollment)

export default router