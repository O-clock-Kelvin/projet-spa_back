/** @format */

import express from 'express';
import animalsController from '../controllers/animals.controller.js';

const animalRouter = express.Router();

/**
 * Router qui gère l'ensemble des routes "animals"
 */

/**
 * Récupère la liste des animaux
 */
// router.get('/animals');


/**
 * Récupère l'animal sélectionné
 */
// router.get('/animals/:id');


/* je veux connaitre la liste des animaux avec un GROS gabarit
*/
// router.get('/animals/query?gabarit=GROS');


/* je veux créer un nouvel animal
*/
// router.post('/animals');


/* je veux mettre à jour un animal en particulier
*/
// router.patch('/animals/:id');


/* je veux un status 204
*/
// router.delete('/animals/:id');


export default animalRouter;