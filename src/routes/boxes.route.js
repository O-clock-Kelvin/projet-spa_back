/** @format */

import express from 'express';
// import boxesController from '../controllers/boxes.controller.js';

const boxRouter = express.Router();

/**
 * Router qui gère l'ensemble des routes "boxes"
 */

/**
 * Récupère la liste de toutes les boxes
 * => on pourra appliquer un middleware de filtre
 */
// router.get('/boxes');

/**
 * Récupère une box
 */
// router.get('/boxes/:id');

/* je veux connaitre les animaux d'une box
 */
// router.get('/boxes/:id/animals');

/**
 * Créer un nouveau box
 * => pas utile pour la v1
 */
// router.post('/boxes')

/**
 * Mettre à jour un box
 * => pas utile pour la v1
 */
// router.update('/boxes/:id')

/**
 * Supprimer un box
 */
// router.delete('/boxes/:id')

export default boxRouter;
