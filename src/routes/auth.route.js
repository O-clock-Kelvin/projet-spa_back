/** @format */

import express from 'express';
import authController from '../controllers/auth.controller.js';

const authRouter = express.Router();

/**
 * Router qui gère les fonctions de connexion
 */
authRouter.post('/login', async (req, res) => {
	const token = await authController.login(req.body.email, req.body.password);
	res.json({ token });
});

export default authRouter;
