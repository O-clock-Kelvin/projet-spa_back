/** @format */

import qs from 'qs';
import prismaClient from '../prisma.js';
import APIError from '../services/APIError.service.js';
import uploadService from '../services/upload.service.js';

const animalsController = {
	/**
	 * Méthode pour récupérer tous les animaux en base de donnée
	 */
	getAll: async (req, res, next) => {
		const { tagsList } = req.filters;

		// On vérifie que le filtre volunteer_experience est présent et que c'est un tableau
		let volunteerExperienceFilter;
		if (req.filters.volunteer_experience) {
			if (Array.isArray(req.filters.volunteer_experience)) {
				volunteerExperienceFilter = {
					volunteer_experience: {
						in: req.filters.volunteer_experience,
					},
				};
			} else {
				volunteerExperienceFilter = {
					volunteer_experience: req.filters.volunteer_experience,
				};
			}
		}

		// On supprime les tags traités pour ne pas faire échouer la requete Prisma
		delete req.filters.tagsList;
		delete req.filters.volunteer_experience;

		try {
			const animals = await prismaClient.animal.findMany({
				where: {
					...req.filters,
					...volunteerExperienceFilter,
					...(tagsList && {
						tags: {
							some: {
								tag_id: {
									in: tagsList,
								},
							},
						},
					}),
				},

				include: {
					/**
					 * 1) la notation (!!) permet de "caster" une expression vers un boolean (true/false)
					 * => https://brianflove.com/2014-09-02/whats-the-double-exclamation-mark-for-in-javascript/
					 *
					 * 2) la notation "req.include?.includes" permet de vérifier que l'objet "req.include" existe bien. Si il existe, la méthode "includes" s'exécute, sinon la variable
					 * est définie comme undefined
					 * => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
					 */
					//  !req.include?.includes('walks')&& {

					// 					},
					walks: req.include?.includes('walks') && {
						orderBy: {
							date: 'asc',
						},
					},
					box: !!req.include?.includes('box'),
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

		// on parse la query pour récupérer la requête en objet
		const queryParams = qs.parse(req.query, { comma: true });

		try {
			// si l'animal existe, on soumet la requete en bdd//
			const getAnimal = await prismaClient.animal.findUnique({
				where: {
					id: Number(animalId),
				},
				include: {
					walks: queryParams.include?.includes('walks')
						? {
								orderBy: {
									id: 'asc',
								},
						  }
						: false,
					tags: queryParams.include?.includes('tags')
						? {
								include: {
									tag: true,
								},
						  }
						: false,
					box: !!queryParams.include?.includes('box'),
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
		let nextCursor = null;

		const queryCursor = Number(req.query.cursor);

		try {
			const walks = await prismaClient.walk.findMany({
				where: {
					animal_id: animalId,
				},
				orderBy: {
					date: 'desc',
				},
				cursor:
					queryCursor !== 0
						? {
								id: queryCursor,
						  }
						: undefined,
				skip: queryCursor !== 0 ? 1 : undefined,
				take: queryCursor != null ? 3 : undefined,
			});

			if (walks.length > 0) {
				nextCursor = await prismaClient.walk.findFirst({
					where: {
						animal_id: animalId,
					},
					orderBy: {
						date: 'desc',
					},
					cursor: {
						id: walks[walks.length - 1].id,
					},
					skip: 1,
					take: 1,
				});
			}

			if (!walks) {
				res.status(404).json({ message: 'NOT_FOUND' });
			} else {
				res.json({ walks, nextCursor: nextCursor?.id || null });
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
		if (req.user.admin === true) {
			try {
				// On gère la validation de la box, si le box_id est en paramètre de la requête
				if (req.body.box_id) {
					const requestBox = await prismaClient.box.findUnique({
						where: { id: req.body.box_id },
					});

					if (requestBox) {
						if (requestBox.type !== req.body.species) {
							throw new APIError({
								code: 404,
								message: 'INVALID_BOX_SPECIE',
							});
						}
					} else {
						throw new APIError({
							code: 404,
							message: 'BOX_NOT_FOUND',
						});
					}
				}

				const animal = req.body;

				// création de l'objet permettant la relation avec les tags au sein de la table de liaison
				let tagCreation;
				if (Array.isArray(animal.tags)) {
					if (animal.tags) {
						tagCreation = animal.tags.map((tag) => ({
							tag_id: tag,
						}));
					}
				} else {
					tagCreation = animal.tags.split(',').map((tag) => ({
						tag_id: Number(tag),
					}));
				}

				// Gestion de l'upload d'image
				if (req.file) {
					const fileExtension = req.file.originalname.split('.').pop();

					const urlImage = await uploadService.upload(
						'animals',
						fileExtension,
						req.file.buffer
					);

					animal.url_image = urlImage;
				}

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
						tags: {
							create: tagCreation,
						},
						url_image: animal.url_image,
					},
				});
				// on renvoie les données créées
				res.status(201).json(createAnimal);
			} catch (error) {
				next(new APIError(error));
			}
		} else {
			res.status(401).json({ message: 'INVALID_PERMISSIONS' });
		}
	},

	/**
	 * Méthode pour mettre a jour un animal spécifique
	 */
	update: async (req, res, next) => {
		if (req.user.admin === true) {
			try {
				/**
				 * On gère le cas d'un upload d'image pour l'animal
				 */
				if (req.file) {
					// On récupère l'exension du fichier, puis on lui attribue un nom aléatoire
					const fileExtension = req.file.originalname.split('.').pop();

					// On fait appel à notre service d'upload qui transmet les données sur les serveurs d'AWS, et retourne le lien de l'image
					const urlImage = await uploadService.upload(
						'animals',
						fileExtension,
						req.file.buffer
					);

					// on ajoute le lien récupéré dans le req.body, pour ensuite le passer dans Prisma pour changer le champ url_image de l'animal en base de donnée
					req.body.url_image = urlImage;
				}

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
		} else {
			res.status(401).json({ message: 'INVALID_PERMISSIONS' });
		}
	},

	delete: async (req, res, next) => {
		if (req.user.admin === true) {
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
		} else {
			res.status(401).json({ message: 'INVALID_PERMISSION' });
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
