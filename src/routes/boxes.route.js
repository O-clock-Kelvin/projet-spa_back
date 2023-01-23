/** @format */

import express from 'express';
import boxesController from '../controllers/boxes.controller.js';

/**
 * Router qui gère l'ensemble des routes "boxes"
 */

const boxRouter = express.Router();

/**
 * Récupère la liste de toutes les boxes
 * => on pourra appliquer un middleware de filtre
 */

boxRouter.get('/', boxesController.getAll);

/* je veux connaitre les animaux d'une box
 */
// router.get('/boxes/:id/animals');

boxRouter.get('/:id/animals', boxesController.getAnimals);

/**
 * Récupère une box
 */
boxRouter.get('/:id', boxesController.getOne);

/**
 * Créer un nouveau box
 * => pas utile pour la v1
 */
boxRouter.post('/', boxesController.create);

/**
 * Mettre à jour un box
 * => pas utile pour la v1
 */
boxRouter.patch('/:id', boxesController.update);

/**
 * Supprimer un box
 */
boxRouter.delete('/:id', boxesController.delete);

export default boxRouter;
