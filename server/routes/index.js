import express from 'express';

import user from './userRouter';
import center from './adminRouter';
import event from './eventRouter';

const route = express.Router();

route.use('/users', user);
route.use('/centers', center);
route.use('/events', event);

module.exports = route;
