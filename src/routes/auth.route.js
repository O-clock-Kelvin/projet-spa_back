/** @format */

import express from 'express';
import authController from '../controllers/auth.controller.js';

const authRouter = express.Router();

/**
 * Router qui gère les fonctions de connexion
 */
authRouter.post('/login', authController.login);
export default authRouter;
