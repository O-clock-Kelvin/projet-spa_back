/** @format */

import express from 'express';
import boxesController from '../controllers/boxes.controller.js';

const boxRouter = express.Router();

/**
 * Router qui gère l'ensemble des routes "boxes"
 */

/**
 * Récupère la liste de toutes les boxes
 */
// router.get('/boxes');


/**
 * Récupère une box
 */
// router.get('/boxes/:id');


/* je veux connaitre les animaux d'une box
*/
// router.get('/boxes/:id/animals');



/* je veux connaitre la liste des box contenant un CHAT
*/
// router.get('/boxes/query?type=CHAT');





export default boxRouter;