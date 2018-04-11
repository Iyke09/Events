import express from 'express';
import adminController from '../controllers/index';
import authToken from '../middleware/tokenAuth';

const router = express.Router();

router.get('/', adminController.allCenter);

router.get('/:id', adminController.detailCenter);

router.put('/favorite/:id', adminController.favoriteCenter);

router.post('/reviews', adminController.addReview);

router.get('/reviews/:id', adminController.getReviews);

router.use('/', authToken);

router.post('/', adminController.addCenter);

router.put('/:id', adminController.updateCenter);


export default router;
