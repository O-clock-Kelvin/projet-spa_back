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

/**
 * Créer un nouvel utilisateur
 */
// router.post('/users);

/**
 * Mettre à jour un utilisateur
 */
// router.patch('/users/:id)

/**
 * Supprimer un utilisateur
 * router.delete('/users/:id')
 */
export default userRouter;
