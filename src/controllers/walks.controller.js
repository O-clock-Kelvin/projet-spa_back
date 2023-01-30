/** @format */

import prismaClient from '../prisma.js';
import APIError from '../services/APIError.service.js';
import utilsService from '../services/utils.service.js';

const walksController = {
	getAll: async (req, res, next) => {
		try {
			let includeList;
			if (req.include) {
				if (req.include.includes('user')) {
					includeList = { ...includeList, user: true };
				}

				if (req.include.includes('animal')) {
					includeList = { ...includeList, animal: true };
				}
			}
			const walks = await prismaClient.walk.findMany({
				where: req.filters,
				include: includeList,
				orderBy: req.sort,
				skip: req.pagination.skip,
				take: req.pagination.take,
			});
			res.json(walks);
		} catch (error) {
			next(
				new APIError({
					error,
				})
			);
		}
	},

	getOne: async (req, res, next) => {
		const walkId = req.params.id;
		try {
			// si l'animal existe, on soumet la requete en bdd//
			const getWalk = await prismaClient.walk.findUnique({
				where: {
					id: Number(walkId),
				},
			});
			// si l'animal n'est pas trouvé en bdd on passe au middleware handlerError
			if (!getWalk) {
				res.status(404).json({ message: 'NOT_FOUND' });
			} else {
				res.json(getWalk);
			}
		} catch (error) {
			next(
				new APIError({
					error,
				})
			);
		}
	},

	create: async (req, res, next) => {
		try {
			if (!req.user.admin) {
				const walk = req.body;
				const animalData = await prismaClient.animal.findUnique({
					where: { id: walk.animal_id },
				});
				if (animalData) {
					const userData = await prismaClient.user.findUnique({
						where: { id: walk.user_id },
					});
					if (userData) {
						if (
							utilsService.experienceToNumber(userData.experience) >=
							utilsService.experienceToNumber(animalData.volunteer_experience)
						) {
							const createWalk = await prismaClient.walk.create({
								data: {
									animal_id: walk.animal_id,
									user_id: walk.user_id,
									comment: walk.comment,
									feeling: walk.feeling || 'GOOD',
									date: walk.date,
								},
							});
							res.status(201).json(createWalk);
						} else {
							res.status(401).json({ message: 'INSUFFICIENT_EXPERIENCE' });
						}
					} else {
						res.status(404).json({ message: 'USER_NOT_FOUND' });
					}
				} else {
					res.status(404).json({ message: 'ANIMAL_NOT_FOUND' });
				}
			} else {
				res.status(401).json({ message: 'INVALID_PERMISSIONS' });
			}
		} catch (error) {
			next(
				new APIError({
					error,
				})
			);
		}
	},

	update: async (req, res, next) => {
		try {
			const walkId = req.params.id;
			const walkData = await prismaClient.walk.findUnique({
				where: { id: walkId },
			});
			if (walkData) {
				if (walkData.user_id === req.user.id || req.user.admin) {
					const updatedWalk = await prismaClient.walk.update({
						where: {
							id: Number(walkId),
						},
						data: req.body,
					});
					res.json(updatedWalk);
				} else {
					res.status(401).json({ message: 'INVALID PERMISSIONS' });
				}
			} else {
				res.status(404).json({ message: 'NOT_FOUND' });
			}
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
			if (req.user.admin) {
				const walkId = req.params.id;
				await prismaClient.animal.delete({
					where: {
						id: Number(walkId),
					},
				});
				res.status(204).json();
			} else {
				res.status(401).json({ message: 'INVALID_PERMISSIONS' });
			}
		} catch (error) {
			next(
				new APIError({
					error,
				})
			);
		}
	},
};
export default walksController;
