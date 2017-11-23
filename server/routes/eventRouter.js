import express from 'express';
import eventController from '../controllers/index';
import authToken from '../middleware/token2';

const router = express.Router();

router.use('/', authToken);

router.post('/', eventController.addEvent);

router.delete('/:id', eventController.deleteEvent);

router.put('/:id', eventController.updateEvent);


export default router;
