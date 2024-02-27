import express from "express";
import signup from "../controllers/user/signup";
import verifyUser from "../controllers/user/verifyUser";
import forgotPass from "../controllers/user/forgotPass";
import verifyReset from "../controllers/user/verifyReset";
const router = express.Router();

router.post('/signup', signup)
router.get('/verifyUser/:token', verifyUser)
router.post('/forgotPass', forgotPass)
router.get('/verifyReset/:token', verifyReset)

export default router