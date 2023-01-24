/** @format */

import prismaClient from '../prisma.js';

const animalsController = {
	/**
	 * Méthode pour récupérer tous les animaux en base de donnée
	 */
	getAll: async (req, res) => {
		try {
			const animals = await prismaClient.animal.findMany();
			res.json(animals);
		} catch (error) {
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},
	/**
	 * Méthode pour récupérer un animal en particuliers
	 */
	getOne: async (req, res) => {
		const animalId = req.params.id;
		try {
			// si l'animal existe, on soumet la requete en bdd//
			const getAnimal = await prismaClient.animal.findUnique({
				where: {
					id: Number(animalId),
				},
			});
			// si l'animal n'est pas trouvé en bdd on passe au middleware handlerError
			if (!getAnimal) {
				res.status(404).json();
			} else {
				res.json(getAnimal);
			}
		} catch (error) {
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},
	/**
	 * Méthode pour créer un nouvel animal
	 */
	create: async (req, res) => {
		try {
			const animal = req.body;

			const createAnimal = await prismaClient.animal.create({
				data: {
					species: animal.species || 'OTHER',
					name: animal.name,
					bio: animal.bio,
					gender: animal.gender,
					age: new Date(animal.age),
					size: animal.size,
					volunteer_experience: animal.volunteer_experience || 'BEGINNER',
					box_id: Number(animal.box_id),
				},
			});
			// on renvoie les données créées
			res.status(201).json(createAnimal);
		} catch (error) {
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},
	/**
	 * Méthode pour mettre a jour un animal spécifique
	 */
	update: async (req, res) => {
		try {
			// on modifie l'animal
			const animalId = req.params.id;

			const updatedAnimal = await prismaClient.animal.update({
				where: {
					// on cherche l'animal par son id, on converti en number
					id: Number(animalId),
				},
				// on ajoute toutes les données présentes dans req.body
				data: req.body,
			});
			res.json(updatedAnimal);
		} catch (error) {
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},
	delete: async (req, res) => {
		try {
			const animalId = req.params.id;
			await prismaClient.animal.delete({
				where: {
					id: Number(animalId),
				},
			});
			res.status(204).json();
		} catch (error) {
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},
};

export default animalsController;
