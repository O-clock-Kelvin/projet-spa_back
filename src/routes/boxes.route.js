/** @format */

import express from 'express';
import boxesController from '../controllers/boxes.controller.js';
import validate from '../middlewares/validation.middleware.js';
import boxesValidation from '../validations/boxes.validation.js';
import commonValidation from '../validations/common.validation.js';
import filters from '../middlewares/filters.middleware.js';
import authentification from '../middlewares/auth.middleware.js';
/**
 * Router qui gère l'ensemble des routes "boxes"
 */

const boxRouter = express.Router();

/**
 * Récupère la liste de toutes les boxes
 * => on pourra appliquer un middleware de filtre
 */

boxRouter.get(
	'/',
	authentification,
	filters(boxesValidation.queryFilters),
	boxesController.getAll
);

boxRouter.get('/tovisit', authentification, boxesController.toVisit);

/* je veux connaitre les animaux d'un box
 */
boxRouter.get(
	'/:id/animals',
	validate(commonValidation.idParams, 'params'),
	authentification,
	boxesController.getAnimals
);

/**
 * Récupère l'historique des visites d'un box unique
 */
boxRouter.get(
	'/:id/visits',
	validate(commonValidation.idParams, 'params'),
	authentification,
	boxesController.getVisitsOfOneBox
);

/**
 * Récupère un box
 */
boxRouter.get(
	'/:id',

	validate(commonValidation.idParams, 'params'),
	authentification,
	boxesController.getOne
);

/**
 * Créer un nouveau box
 * => pas utile pour la v1
 */
boxRouter.post(
	'/',
	authentification,
	validate(boxesValidation.create, 'body'),
	boxesController.create
);

/**
 * Mettre à jour un box
 * => pas utile pour la v1
 */
boxRouter.patch(
	'/:id',
	validate(commonValidation.idParams, 'params'),
	authentification,
	validate(boxesValidation.update, 'body'),
	boxesController.update
);

/**
 * Supprimer un box
 */
boxRouter.delete(
	'/:id',
	validate(commonValidation.idParams, 'params'),
	authentification,
	boxesController.delete
);

export default boxRouter;
