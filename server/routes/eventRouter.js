import express from 'express';
import jwt from 'jsonwebtoken';
import eventController from '../controllers/events/indexx';

const router = express.Router();

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

router.post('/', eventController.addEvents);

router.delete('/:id', eventController.deleteEvent);

router.put('/:id', eventController.updateEvent);


export default router;
