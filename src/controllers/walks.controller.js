/** @format */

import prismaClient from '../prisma.js';

const walksController = {
	getAll: async (req, res) => {
		try {
			const walks = await prismaClient.walk.findMany();
			res.json(walks);
		} catch (error) {
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},

	getOne: async (req, res) => {
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
				res.status(404).json();
			} else {
				res.json(getWalk);
			}
		} catch (error) {
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},

	create: async (req, res) => {
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
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},

	update: async (req, res) => {
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
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},

	delete: async (req, res) => {
		try {
			const walkId = req.params.id;
			await prismaClient.animal.delete({
				where: {
					id: Number(walkId),
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
export default walksController;
