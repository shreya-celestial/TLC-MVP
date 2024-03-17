import express from 'express';
import signup from '../controllers/user/signup';
import login from '../controllers/user/login';
import verifyUser from '../controllers/user/verifyUser';
import forgotPass from '../controllers/user/forgotPass';
import verifyReset from '../controllers/user/verifyReset';
import resetPass from '../controllers/user/resetPass';
import updateLogStatus from '../controllers/user/updateLogStatus';
import updateUser from '../controllers/user/updateUser';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verifyUser', verifyUser);
router.post('/forgotPass', forgotPass);
router.get('/verifyReset', verifyReset);
router.post('/resetPass', resetPass)
router.put('/updateLogStatus', updateLogStatus)
router.put('/:email/update', auth, updateUser)

export default router;
