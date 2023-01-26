/** @format */
import express from 'express';
import userRouter from './users.route.js';
import authRouter from './auth.route.js';
import animalRouter from './animals.route.js';
import visitRouter from './visits.route.js';
import boxRouter from './boxes.route.js';
import walkRouter from './walks.route.js';

const v1Router = express.Router();

v1Router.use('/animals', animalRouter);
v1Router.use('/auth', authRouter);
v1Router.use('/users', userRouter);
v1Router.use('/boxes', boxRouter);
v1Router.use('/visits', visitRouter);
v1Router.use('/walks', walkRouter);

export default v1Router;
