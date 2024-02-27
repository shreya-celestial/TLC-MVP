import express from 'express';
import signup from '../controllers/user/signup';
import verify from '../controllers/user/verify';
import login from '../controllers/user/login';

const router = express.Router();

router.post('/signup', signup);
router.get('/verify/:token', verify);
router.post('/login', login);

export default router;
