import express from 'express';
import userController from '../controllers/index';
import authToken from '../middleware/userToken';
import verifyParams from '../middleware/verify';

const router = express.Router();

router.post('/signup', userController.userSignup);

router.post('/signin', userController.userSignin);

router.post('/reset', userController.passRetrieve);

router.post('/reviews/:id', userController.addReview);

router.get('/reviews/:id', verifyParams, userController.getReviews);

router.use('/', authToken);

router.post('/change', userController.passChange);


export default router;
