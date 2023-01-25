/** @format */

import prismaClient from '../prisma.js';
import APIError from '../services/APIError.service.js';

const boxesController = {
	getAll: async (req, res, next) => {
		console.log(req.sort);
		try {
			const boxes = await prismaClient.box.findMany({
				where: req.filters,
				take: req.pagination.take,
				skip: req.pagination.skip,
				orderBy: req.sort,
			});

			res.json(boxes || []);
		} catch (error) {
			next(
				new APIError({
					error,
				})
			);
		}
	},

	getOne: async (req, res, next) => {
		try {
			const box = await prismaClient.box.findUnique({
				where: {
					id: Number(req.params.id),
				},
			});

			if (box) {
				res.json(box);
			} else {
				res.status(404).json([]);
			}
		} catch (error) {
			next(
				new APIError({
					error,
				})
			);
		}
	},

	getAnimals: async (req, res, next) => {
		try {
			// on va chercher dans les animaux quels animaux ont l'id de la box
			const animals = await prismaClient.animal.findMany({
				where: {
					box_id: Number(req.params.id),
				},
			});
			res.json(animals || []);
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
			const createdBox = await prismaClient.box.create({
				data: {
					type: req.body.type.toUpperCase() || 'OTHER',
					nbr_of_places: Number(req.body.nbr_of_places),
					number: req.body.number,
				},
			});
			res.status(201).json(createdBox);
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
			const updatedBox = await prismaClient.box.update({
				where: {
					id: Number(req.params.id),
				},
				data: req.body,
			});

			res.json(updatedBox);
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
			await prismaClient.box.delete({
				where: {
					id: Number(req.params.id),
				},
			});
			res.status(204).json([]);
		} catch (error) {
			next(
				new APIError({
					error,
				})
			);
		}
	},
};

export default boxesController;
