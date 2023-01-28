/** @format */

import prismaClient from '../prisma.js';
import APIError from '../services/APIError.service.js';
import filtersService from '../services/filters.service.js';

const animalsController = {
	/**
	 * Méthode pour récupérer tous les animaux en base de donnée
	 */
	getAll: async (req, res, next) => {
		let whereTagsRequest;
		if (req.filters.tagsList) {
			whereTagsRequest = filtersService.filterByAnimalTags(
				req.filters.tagsList
			);
			delete req.filters.tagsList;
		}

		/**
		 * Ajout des tags en include si demandés
		 */
		// let includeList;
		// let includeTags;
		// let includeWalks;
		// if (req.include) {
		// 	if (req.include.includes('tags')) {
		// 		includeTags = {
		// 			tags: {
		// 				include: {
		// 					tag: true,
		// 				},
		// 			},
		// 		};
		// 	}

		// 	if (req.include.includes('walks')) {
		// 		includeWalks = {
		// 			walks: true,
		// 		};
		// 	}
		// }

		try {
			const animals = await prismaClient.animal.findMany({
				// include: includeTags,
				where: {
					...req.filters,
					...whereTagsRequest,
				},
				// include: includeTags,
				include: {
					/**
					 * 1) la notation (!!) permet de "caster" une expression vers un boolean (true/false)
					 * => https://brianflove.com/2014-09-02/whats-the-double-exclamation-mark-for-in-javascript/
					 *
					 * 2) la notation "req.include?.includes" permet de vérifier que l'objet "req.include" existe bien. Si il existe, la méthode "includes" s'exécute, sinon la variable
					 * est définie comme undefined
					 * => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
					 */

					walks: !!req.include?.includes('walks'),
					tags: req.include?.includes('tags')
						? {
								include: {
									tag: true,
								},
						  }
						: false,
				},
				orderBy: req.sort,
				skip: req.pagination.skip,
				take: req.pagination.take,
			});
			res.json(animals);
		} catch (error) {
			next(
				new APIError({
					error,
				})
			);
		}
	},
	/**
	 * Méthode pour récupérer un animal en particulier
	 */
	getOne: async (req, res, next) => {
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
				res.status(404).json({ message: 'NOT_FOUND' });
			} else {
				res.json(getAnimal);
			}
		} catch (error) {
			next(
				new APIError({
					error,
				})
			);
		}
	},
	/**
	 * Méthode pour récupérer l'historique des balades d'un animal en particulier
	 */
	getWalksOfAnimal: async (req, res, next) => {
		const animalId = req.params.id;
		try {
			const getWalksOfAnimal = await prismaClient.animal.findUnique({
				include: {
					walks: {
						select: {
							date: true,
							comment: true,
							feeling: true,
						},
						orderBy: {
							date: 'desc',
						},
					},
				},
				where: {
					id: animalId,
				},
			});

			if (!getWalksOfAnimal) {
				res.status(404).json({ message: 'NOT_FOUND' });
			} else {
				res.json(getWalksOfAnimal);
			}
		} catch (error) {
			next(
				new APIError({
					error,
				})
			);
		}
	},
	/**
	 * Méthode pour créer un nouvel animal
	 */
	create: async (req, res, next) => {
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
			next(
				new APIError({
					error,
				})
			);
		}
	},
	/**
	 * Méthode pour mettre a jour un animal spécifique
	 */
	update: async (req, res, next) => {
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
			next(
				new APIError({
					error,
				})
			);
		}
	},
	delete: async (req, res, next) => {
		try {
			const animalId = req.params.id;
			await prismaClient.animal.delete({
				where: {
					id: Number(animalId),
				},
			});
			res.status(204).json();
		} catch (error) {
			next(
				new APIError({
					error,
				})
			);
		}
	},

	/**
	 * Retourne la liste des animaux (sous entendu les chiens, à l'heure actuelle) à balader en priorité
	 */
	toWalk: async (req, res, next) => {
		try {
			const animalsToWalk = await prismaClient.AnimalsToWalk.findMany({
				where: {
					species: 'DOG',
				},
				skip: Number(req.query.skip) || 0,
				take: Number(req.query.take) || undefined,
				// le 'orderBy' n'est pas nécessaire, la vue SQL s'en charge a notre place
			});

			res.json(animalsToWalk);
		} catch (error) {
			next(
				new APIError({
					error,
				})
			);
		}
	},
};

export default animalsController;
