/** @format */

import express from 'express';

import animalsController from '../controllers/animal.controller.js';
import validate from '../middlewares/validation.middleware.js';
import animalsValidation from '../validations/animals.validation.js';
import commonValidation from '../validations/common.validation.js';
import filters from '../middlewares/filters.middleware.js';
import authentification from '../middlewares/auth.middleware.js';
import fileUpload from '../middlewares/fileUpload.middleware.js';

const animalRouter = express.Router();

/**
 * Router qui gère l'ensemble des routes "animals"
 */

/**
 * Récupère la liste des animaux
 * Peut également inclure des filtres
 *
 * => http://localhost:3001/v1/animals?volunteer_experience=BEGINNER&specie=CAT
 */
animalRouter.get(
	'/',
	authentification,
	filters(animalsValidation.queryFilters),
	animalsController.getAll
);

/**
 * Route spécialisée - récupérer la liste des chiens (ou animaux) à sortir en priorité
 */

animalRouter.get('/towalk', authentification, animalsController.toWalk);
/**
 * Récupère l'animal sélectionné
 */
animalRouter.get(
	'/:id',
	authentification,
	validate(commonValidation.idParams, 'params'),
	animalsController.getOne
);

/**
 * Récupère l'historique des balades d'un animal en particulié
 */
animalRouter.get(
	'/:id/walks',
	authentification,
	validate(commonValidation.idParams, 'params'),
	animalsController.getWalksOfAnimal
);

/* je veux créer un nouvel animal
 */
animalRouter.post(
	'/',
	authentification,
	fileUpload.single('image'),
	validate(animalsValidation.create, 'body'),
	animalsController.create
);

/* je veux mettre à jour un animal en particulier
 */
animalRouter.patch(
	'/:id',

	validate(commonValidation.idParams, 'params'),
	authentification,
	fileUpload.single('image'),
	validate(animalsValidation.update, 'body'),
	animalsController.update
);

/* je veux supprimer un animal en particulier
 */
animalRouter.delete(
	'/:id',
	validate(commonValidation.idParams, 'params'),
	authentification,
	animalsController.delete
);

export default animalRouter;
