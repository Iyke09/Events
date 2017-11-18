import express from 'express';

import user from './userRouter';
import center from './adminRouter';

const route = express.Router();

route.use('/users', user);
route.use('/centers', center);

module.exports = route;
