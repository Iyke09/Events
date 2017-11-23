import express from 'express';
import userController from '../controllers/index';
import authToken from '../middleware/token2';

const router = express.Router();

router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the your Favorite API!!!!!!!!!!!!',
}));

router.post('/signup', userController.userSignup);

router.post('/signin', userController.userSignin);

router.post('/reset', userController.passRetrieve);

router.use('/', authToken);

router.post('/change', userController.passChange);


export default router;
