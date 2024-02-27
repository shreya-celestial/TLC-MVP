import express from 'express';
import signup from '../controllers/user/signup';
import login from '../controllers/user/login';
import verifyUser from '../controllers/user/verifyUser';
import forgotPass from '../controllers/user/forgotPass';
import verifyReset from '../controllers/user/verifyReset';
import resetPass from '../controllers/user/resetPass';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verifyUser/:token', verifyUser);
router.post('/forgotPass', forgotPass);
router.get('/verifyReset/:token', verifyReset);
router.post('/resetPass', resetPass)

export default router;
