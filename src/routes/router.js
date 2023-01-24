/** @format */
import express from 'express';
import userRouter from './users.route.js';
import authRouter from './auth.route.js';
import animalRouter from './animals.route.js';

const v1Router = express.Router();

v1Router.use('/users', userRouter);

v1Router.use('/animals', animalRouter);

v1Router.use('/auth', authRouter);


export default v1Router;
