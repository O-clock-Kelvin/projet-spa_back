/** @format */

import express from 'express';
import validate from '../middlewares/validation.middleware.js';
import authController from '../controllers/auth.controller.js';
import authValidation from '../validations/auth.validation.js';

const authRouter = express.Router();

/**
 * Router qui gère les fonctions de connexion
 */
authRouter.post(
	'/login',
	validate(authValidation.loginBody, 'body'),
	authController.login
);
export default authRouter;
