/** @format */

import express from 'express';
import animalsController from '../controllers/animal.controller.js';

const animalRouter = express.Router();

/**
 * Router qui gère l'ensemble des routes "animals"
 */

/**
 * Récupère la liste des animaux
 * Peut également inclure des filtres
 * 
 * => http://localhost:3001/v1/animals?volunteer_experience=BEGINNER&specie=CAT
 */
animalRouter.get('/', animalsController.getAll);


/**
 * Récupère l'animal sélectionné
 */
animalRouter.get('/:id', animalsController.getOne);


/* je veux créer un nouvel animal
*/
animalRouter.post('/', animalsController.create); 


/* je veux mettre à jour un animal en particulier
*/
animalRouter.patch('/:id', animalsController.update);


/* je veux supprimer un animal en particulier
*/
animalRouter.delete('/:id', animalsController.delete);


export default animalRouter;