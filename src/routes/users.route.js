/** @format */

import express from 'express';
import usersController from '../controllers/users.controller.js';

const userRouter = express.Router();

/**
 * Router qui gère l'ensemble des routes "users"
 */

/**
 * Récupère toutes les données utilisateurs
 */
userRouter.get('/', async (req, res) => {
	const data = await usersController.getAllUsers();
	res.json(data);
});

userRouter.get('/:id', async (req, res) => {
	const user = await usersController.getUser(req.params.id);
	res.json(user);
});

// router.post();
// router.patch()
// router.get('/:id')

export default userRouter;
