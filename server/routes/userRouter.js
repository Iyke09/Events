import express from 'express';
import userController from '../controllers/user/index';

const router = express.Router();

router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the your Favorite API!!!!!!!!!!!!',
}));

router.post('/signup', userController.signup);

router.post('/signin', userController.signin);

export default router;
