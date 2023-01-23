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
userRouter.get('/', usersController.getAllUsers);

userRouter.get('/:id', usersController.getUser);

/**
 * Créer un nouvel utilisateur
 */

userRouter.post('/', usersController.create);
/**
 * Mettre à jour un utilisateur
 * update
 */
userRouter.patch('/:id', usersController.update);

/**
 * Supprimer un utilisateur
 * delete
 */
userRouter.delete('/:id', usersController.delete);

export default userRouter;
