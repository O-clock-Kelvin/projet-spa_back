/** @format */
import express from 'express';
import userRouter from './users.route.js';
import authRouter from './auth.route.js';

const v1Router = express.Router();

v1Router.use('/users', userRouter);
v1Router.use('/auth', authRouter);
// v1router.user('/animals', animalRouter); etc..

export default v1Router;
