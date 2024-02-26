import express from "express";
import signup from "../controllers/user/signup";
import verify from "../controllers/user/verify";
const router = express.Router();

router.post('/signup', signup)
router.get('/verify/:token', verify)

export default router