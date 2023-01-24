/** @format */

import express from 'express';
import visitsController from '../controllers/visits.controller.js';

const visitRouter = express.Router();

/**
 * Router qui gère l'ensemble des routes "visits"
 */

/**
 * Récupère la liste de toutes les visites
 * => on pourra appliquer des filtres plus tar
 */
// router.get('/visits');
visitRouter.get('/', visitsController.getAll);

/**
 * Je veux créer une nouvelle visite
 */
// router.post('/visits)
visitRouter.post('/', visitsController.create);

/**
 * Je veux récupérer une visite en particulier
 */
// router.get('/visits/:id')

visitRouter.get('/:id', visitsController.getOne);

/**
 * Je veux mettre à jour une visite
 */
// router.patch('/visits/:id')
visitRouter.patch('/:id', visitsController.update);

/**
 * Je veux supprimer une visite
 */
visitRouter.delete('/:id', visitsController.delete);

export default visitRouter;
