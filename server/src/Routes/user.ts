import express from "express";
import { signup } from "../controllers/userController";
const router = express.Router();

router.post('/signup', signup)

export default router