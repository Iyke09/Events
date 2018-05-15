import express from 'express';
import eventController from '../controllers/index';
import authToken from '../middleware/token2';
import verifyParams from '../middleware/verify';

const router = express.Router();

router.get('/user', eventController.userEvent);

router.get('/single/:id', verifyParams, eventController.singleEvent);

router.use('/', authToken);

router.post('/', eventController.addEvent);

router.delete('/:id', verifyParams, eventController.deleteEvent);

router.put('/:id', verifyParams, eventController.updateEvent);


export default router;
