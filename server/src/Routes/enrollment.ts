import express from "express";
import newEnrollment from "../controllers/enrollments/newEnrollment";
import allPageEnrollments from "../controllers/enrollments/allPageEnrollments";
import singleEnrollment from "../controllers/enrollments/singleEnrollment";
import updateEnrollment from "../controllers/enrollments/updateEnrollment";
import deleteEnrollments from "../controllers/enrollments/deleteEnrollments";
import inviteEnrollment from "../controllers/enrollments/inviteEnrollment";
import auth from "../middlewares/auth";
import verifyEnrollmentInvite from "../controllers/enrollments/verifyEnrollmentInvite";

const router = express.Router();

router.post('/invite', auth, inviteEnrollment)
router.get('/verifyInvite', verifyEnrollmentInvite)
router.post('/', newEnrollment)
router.get('/', auth, allPageEnrollments)
router.get('/:id/details', auth, singleEnrollment)
router.put('/:id/edit', auth, updateEnrollment)
router.delete('/', auth, deleteEnrollments)

export default router