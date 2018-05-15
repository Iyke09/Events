import express from 'express';
import adminController from '../controllers/index';
import authToken from '../middleware/tokenAuth';
import verifyParams from '../middleware/verify';

const router = express.Router();

router.get('/', adminController.allCenter);

router.get('/:id', verifyParams, adminController.detailCenter);

router.put('/favorite/:id', verifyParams, adminController.favoriteCenter);

router.post('/reviews', adminController.addReview);

router.get('/reviews/:id', verifyParams, adminController.getReviews);

router.use('/', authToken);

router.post('/', adminController.addCenter);

router.put('/:id', verifyParams, adminController.updateCenter);



export default router;
