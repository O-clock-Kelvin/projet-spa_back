/** @format */

import express from 'express';
import walksController from '../controllers/walks.controller.js';

const walkRouter = express.Router();

/**
 * Router qui gère l'ensemble des routes "walks"
 */

/**
 * Récupère la liste de toutes les balades
 */
// router.get('/walks');


/**
 * Récupère les détails d'une balade
 */
// router.get('/walks/:id');


/* je veux connaitre les balades d'un animal
*/
// router.get('/walks/query?animalid=id');


/* je veux créer une nouvelle balade
*/
// router.post('/walks');


export default walkRouter;