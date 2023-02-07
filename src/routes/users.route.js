/** @format */

import express from 'express';
import usersController from '../controllers/users.controller.js';
import authentification from '../middlewares/auth.middleware.js';
import filters from '../middlewares/filters.middleware.js';
import validate from '../middlewares/validation.middleware.js';
import commonValidation from '../validations/common.validation.js';
import userValidation from '../validations/user.validation.js';
import fileUpload from '../middlewares/fileUpload.middleware.js';

const userRouter = express.Router();

/**
 * Router qui gère l'ensemble des routes "users"
 */

/**
 * Récupère toutes les données utilisateurs
 */

userRouter.get(
	'/',
	filters(userValidation.queryFilters),
	authentification,
	usersController.getAllUsers
);

userRouter.get(
	'/:id',

	validate(commonValidation.idParams, 'params'),
	authentification,
	usersController.getOne
);

/**
 * Créer un nouvel utilisateur
 */

userRouter.post(
	'/',
	authentification,
	fileUpload.single('image'),
	validate(userValidation.create, 'body'),

	usersController.create
);
/**
 * Mettre à jour un utilisateur
 * update
 */
userRouter.patch(
	'/:id',
	authentification,
	validate(commonValidation.idParams, 'params'),
	fileUpload.single('image'),
	validate(userValidation.update, 'body'),
	usersController.update
);

/**
 * Supprimer un utilisateur
 * delete
 */
userRouter.delete(
	'/:id',
	validate(commonValidation.idParams, 'params'),
	authentification,
	usersController.delete
);

export default userRouter;
