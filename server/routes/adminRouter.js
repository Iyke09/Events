import express from 'express';
// import jwt from 'jsonwebtoken';
import adminController from '../controllers/centers/index';

const router = express.Router();

router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the your Favorite API!',
}));

router.post('/', adminController.addCenter);

router.put('/:id', adminController.updateCenter);

export default router;
