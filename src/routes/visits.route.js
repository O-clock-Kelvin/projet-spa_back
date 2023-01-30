/** @format */

import express from 'express';
import visitsController from '../controllers/visits.controller.js';
import validate from '../middlewares/validation.middleware.js';
import commonValidation from '../validations/common.validation.js';
import visitsValidation from '../validations/visits.validation.js';
import filters from '../middlewares/filters.middleware.js';
import authentification from '../middlewares/auth.middleware.js';

const visitRouter = express.Router();

/**
 * Router qui gère l'ensemble des routes "visits"
 */

/**
 * Récupère la liste de toutes les visites
 * => on pourra appliquer des filtres plus tar
 */
visitRouter.get(
	'/',
	authentification,
	filters(visitsValidation.getFilters),

	visitsController.getAll
);

/**
 * Je veux créer une nouvelle visite
 */
visitRouter.post(
	'/',
	authentification,
	validate(visitsValidation.create, 'body'),
	visitsController.create
);

/**
 * Je veux récupérer une visite en particulier
 */
visitRouter.get(
	'/:id',
	authentification,
	validate(commonValidation.idParams, 'params'),
	visitsController.getOne
);

/**
 * Je veux mettre à jour une visite
 */
visitRouter.patch(
	'/:id',
	authentification,
	validate(commonValidation.idParams, 'params'),
	validate(visitsValidation.update, 'body'),
	visitsController.update
);

/**
 * Je veux supprimer une visite
 */
visitRouter.delete(
	'/:id',
	authentification,
	validate(commonValidation.idParams),
	visitsController.delete
);

export default visitRouter;
