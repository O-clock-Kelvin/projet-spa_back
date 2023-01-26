/** @format */

import express from 'express';
import walksController from '../controllers/walks.controller.js';
import validate from '../middlewares/validation.middleware.js';
import commonValidation from '../validations/common.validation.js';
import filters from '../middlewares/filters.middleware.js';
import walksValidation from '../validations/walks.validation.js';

const walkRouter = express.Router();

/**
 * Router qui gère l'ensemble des routes "walks"
 */

/**
 * Récupère la liste de toutes les balades
 * => on pourra ajouter un middleware de filtres
 */
walkRouter.get(
	'/',
	filters(walksValidation.getFilters),
	walksController.getAll
);

/**
 * Récupère les détails d'une balade
 */
walkRouter.get(
	'/:id',
	validate(commonValidation.idParams, 'params'),
	walksController.getOne
);

/* je veux créer une nouvelle balade
 */
walkRouter.post(
	'/',
	validate(walksValidation.create, 'body'),
 	walksController.create
	);

/**
 * Je veux mettre à jour une balade
 */
walkRouter.patch(
	'/:id',
	validate(commonValidation.idParams, 'params'),
	validate(walksValidation.update, 'body'),
	walksController.update
);

/**
 * Je veux supprimer une balade
 */
walkRouter.delete(
	'/:id',
	validate(commonValidation.idParams, 'params'),
	walksController.delete
);

export default walkRouter;
