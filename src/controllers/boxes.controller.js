/** @format */

import prismaClient from '../prisma.js';
import APIError from '../services/APIError.service.js';

const boxesController = {
	getAll: async (req, res, next) => {
		try {
			const boxes = await prismaClient.box.findMany({
				where: req.filters,
				take: req.pagination.take,
				skip: req.pagination.skip,
				orderBy: req.sort,
			});

			res.json(boxes);
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

	getAnimals: async (req, res, next) => {
		try {
			// on va chercher dans les animaux quels animaux ont l'id de la box
			const animals = await prismaClient.animal.findMany({
				where: {
					box_id: Number(req.params.id),
				},
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
	getVisitsOfOneBox: async (req, res, next) => {
		const boxId = req.params.id;
		let nextCursor = null;
		console.log(req.query);
		const queryCursor = Number(req.query.cursor);
		console.log('CURSOR', queryCursor);
		try {
			const visits = await prismaClient.visit.findMany({
				where: {
					box_id: boxId,
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

			if (visits.length > 0) {
				nextCursor = await prismaClient.visit.findFirst({
					where: {
						box_id: boxId,
					},
					orderBy: {
						date: 'desc',
					},
					cursor: {
						id: visits[visits.length - 1].id,
					},
					skip: 1,
					take: 1,
				});
			}

			if (!visits) {
				res.status(404).json({ message: 'NOT_FOUND' });
			} else {
				res.json({ visits, nextCursor: nextCursor?.id || null });
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
		if (req.user.admin === true) {
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
		} else {
			res.status(401).json({ message: 'INVALID_PERMISSIONS' });
		}
	},

	update: async (req, res, next) => {
		if (req.user.admin === true) {
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
		} else {
			res.status(401).json({ message: 'INVALID_PERMISSIONS' });
		}
	},

	delete: async (req, res, next) => {
		if (req.user.admin === true) {
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
		} else {
			res.status(401).json({ message: 'INVALID_PERMISSIONS' });
		}
	},

	toVisit: async (req, res, next) => {
		try {
			const boxesToVisit = await prismaClient.boxesToVisit.findMany({
				where: {
					type: 'CAT',
				},
				skip: Number(req.query.skip) || 0,
				take: Number(req.query.take) || undefined,
			});
			res.json(boxesToVisit);
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
