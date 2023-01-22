/** @format */

import express from 'express';
import visitsController from '../controllers/visits.controller.js';

const visitRouter = express.Router();

/**
 * Router qui gère l'ensemble des routes "visits"
 */

/**
 * Récupère la liste de toutes les visites
 */
// router.get('/visits');


/* je veux connaitre les visites d'une box
*/
// router.get('/visits/query/?box=id');



/* je veux créer une nouvelle visite
*/
// router.post('/visits');

export default visitRouter;