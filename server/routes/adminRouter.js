import express from 'express';
import adminController from '../controllers/index';
import authToken from '../middleware/tokenAuth';

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Centers
 *     description: Returns all puppies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of puppies
 */
router.get('/', adminController.allCenter);

router.get('/:id', adminController.detailCenter);

router.use('/', authToken);

router.post('/', adminController.addCenter);

router.put('/:id', adminController.updateCenter);


export default router;
