/** @format */

import express from 'express';
import visitsController from '../controllers/visits.controller.js';
import validate from '../middlewares/validation.middleware.js';
import commonValidation from '../validations/common.validation.js';
import visitsValidation from '../validations/visits.validation.js';

const visitRouter = express.Router();

/**
 * Router qui gère l'ensemble des routes "visits"
 */

/**
 * Récupère la liste de toutes les visites
 * => on pourra appliquer des filtres plus tar
 */
visitRouter.get('/', visitsController.getAll);

/**
 * Je veux créer une nouvelle visite
 */
visitRouter.post(
	'/',
	validate(visitsValidation.create, 'body'),
	visitsController.create
);

/**
 * Je veux récupérer une visite en particulier
 */
visitRouter.get(
	'/:id',
	validate(commonValidation.idParams, 'params'),
	visitsController.getOne
);

/**
 * Je veux mettre à jour une visite
 */
visitRouter.patch(
	'/:id',
	validate(commonValidation.idParams, 'params'),
	validate(visitsValidation.update, 'body'),
	visitsController.update
);

/**
 * Je veux supprimer une visite
 */
visitRouter.delete(
	'/:id',
	validate(commonValidation.idParams),
	visitsController.delete
);

export default visitRouter;
