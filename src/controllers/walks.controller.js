/** @format */

import prismaClient from '../prisma.js';
import APIError from '../services/APIError.service.js';

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
				res.status(404).json([]);
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
			const walk = req.body;
			const createWalk = await prismaClient.walk.create({
				data: {
					animal_id: walk.animal_id,
					user_id: walk.user_id,
					comment: walk.comment,
					feeling: walk.feeling || 'GOOD',
					date: walk.date,
				},
			});
			// on renvoie les données créées
			res.status(201).json(createWalk);
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

			const updatedWalk = await prismaClient.walk.update({
				where: {
					id: Number(walkId),
				},

				data: req.body,
			});
			res.json(updatedWalk);
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
			const walkId = req.params.id;
			await prismaClient.animal.delete({
				where: {
					id: Number(walkId),
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
};
export default walksController;
