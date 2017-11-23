import express from 'express';
import adminController from '../controllers/index';
import authToken from '../middleware/tokenAuth';

const router = express.Router();

router.get('/:id', adminController.detailCenter);

router.get('/', adminController.allCenter);

router.use('/', authToken);

router.post('/', adminController.addCenter);

router.put('/:id', adminController.updateCenter);

export default router;
