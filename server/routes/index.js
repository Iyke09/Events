import express from 'express';

import user from './userRouter';

const route = express.Router();

route.use('/users', user);

module.exports = route;
