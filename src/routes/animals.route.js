/** @format */

import express from 'express';
import animalsController from '../controllers/animal.controller.js';
import validate from '../middlewares/validation.middleware.js';
import animalsValidation from '../validations/animals.validation.js';
import commonValidation from '../validations/common.validation.js';
import filters from '../middlewares/filters.middleware.js';

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
	filters(animalsValidation.queryFilters),
	animalsController.getAll
);

/**
 * Récupère l'animal sélectionné
 */
animalRouter.get(
	'/:id',
	validate(commonValidation.idParams, 'params'),
	animalsController.getOne
);

/* je veux créer un nouvel animal
 */
animalRouter.post(
	'/',
	validate(animalsValidation.create, 'body'),
	animalsController.create
);

/* je veux mettre à jour un animal en particulier
 */
animalRouter.patch(
	'/:id',
	validate(commonValidation.idParams, 'params'),
	validate(animalsValidation.update, 'body'),
	animalsController.update
);

/* je veux supprimer un animal en particulier
 */
animalRouter.delete(
	'/:id',
	validate(commonValidation.idParams, 'params'),
	animalsController.delete
);

export default animalRouter;
