import express from 'express';
import userController from '../controllers/user/index';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the your Favorite API!!!!!!!!!!!!',
}));

router.post('/signup', userController.signup);

router.post('/signin', userController.signin);

router.post('/reset', userController.retrieve);

router.use('/', (req, res, next) => {
  const token = req.body.token || req.query.token;
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({
        title: 'Not Authenticated!!!',
        error: err
      });
    }
    next();
  });
});

router.post('/change', userController.change);


export default router;
