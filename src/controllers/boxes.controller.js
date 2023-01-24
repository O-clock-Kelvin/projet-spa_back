/** @format */

import prismaClient from '../prisma.js';

const boxesController = {
	getAll: async (req, res) => {
		try {
			const boxes = await prismaClient.box.findMany();
			res.json(boxes);
		} catch (error) {
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},

	getOne: async (req, res) => {
		try {
			const box = await prismaClient.box.findUnique({
				where: {
					id: Number(req.params.id),
				},
			});
			res.json(box);
		} catch (error) {
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},

	getAnimals: async (req, res) => {
		try {
			// on va chercher dans les animaux quels animaux ont l'id de la box
			const animals = await prismaClient.animal.findMany({
				where: {
					box_id: Number(req.params.id),
				},
			});
			res.json(animals);
		} catch (error) {
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},

	create: async (req, res) => {
		try {
			const createdBox = await prismaClient.box.create({
				data: {
					type: req.body.type.toUpperCase() || 'OTHER',
					nbr_of_places: Number(req.body.nbr_of_places),
					number: req.body.number,
				},
			});
			res.status(201).json(createdBox);
		} catch (error) {
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},

	update: async (req, res) => {
		try {
			const updatedBox = await prismaClient.box.update({
				where: {
					id: Number(req.params.id),
				},
				data: req.body,
			});

			res.json(updatedBox);
		} catch (error) {
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},

	delete: async (req, res) => {
		try {
			await prismaClient.box.delete({
				where: {
					id: Number(req.params.id),
				},
			});
			res.status(204).json([]);
		} catch (error) {
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},
};

export default boxesController;
