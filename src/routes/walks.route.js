/** @format */

import express from 'express';
import walksController from '../controllers/walks.controller.js';
// import walksController from '../controllers/walks.controller.js';

const walkRouter = express.Router();

/**
 * Router qui gère l'ensemble des routes "walks"
 */

/**
 * Récupère la liste de toutes les balades
 * => on pourra ajouter un middleware de filtres
 */
walkRouter.get('/', walksController.getAll);

/**
 * Récupère les détails d'une balade
 */
walkRouter.get('/:id', walksController.getOne);

/* je veux créer une nouvelle balade
 */
walkRouter.post('/', walksController.create);

/**
 * Je veux mettre à jour une balade
 */
walkRouter.patch('/:id', walksController.update);

/**
 * Je veux supprimer une balade
 */
walkRouter.delete('/:id', walksController.delete);

export default walkRouter;
