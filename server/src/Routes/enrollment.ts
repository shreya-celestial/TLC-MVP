import express from "express";
import newEnrollment from "../controllers/enrollments/newEnrollment";

const router = express.Router();

router.post('/', newEnrollment)

export default router