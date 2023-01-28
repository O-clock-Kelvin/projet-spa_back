/** @format */

import prismaClient from '../prisma.js';
import APIError from '../services/APIError.service.js';

const visitsController = {
	// Méthode pour récupérer la liste des visites
	getAll: async (req, res, next) => {
		try {
			let includeList;
			if (req.include) {
				if (req.include.includes('user')) {
					includeList = { ...includeList, user: true };
			
				}

				if (req.include.includes('box')) {
					includeList = { ...includeList, box: true };
				}
			
			}

			const visits = await prismaClient.visit.findMany({
				where: req.filters,
				orderBy: req.sort,
				include: includeList,
				skip: req.pagination.skip,
				take: req.pagination.take,
			});
			res.json(visits);
		} catch (error) {
			next(
				new APIError({
					error,
				})
			);
		}
	},

	// Méthode pour récupérer la liste des visites d'une boxe en particulier
	getOne: async (req, res, next) => {
		try {
			const visit = await prismaClient.visit.findUnique({
				where: {
					id: Number(req.params.id), // on converti l'id en number car il arrive depuis req.params en string
				},
			});

			if (visit) {
				res.json(visit);
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

	// Méthode pour créer une nouvelle visite
	create: async (req, res, next) => {
		try {
			const createdVisit = await prismaClient.visit.create({
				data: {
					user_id: Number(req.body.user_id),
					box_id: Number(req.body.box_id),
					comment: req.body.comment,
					date: new Date(),
				},
			});

			// on renvoie les données créées
			res.status(201).json(createdVisit);
		} catch (error) {
			next(
				new APIError({
					error,
				})
			);
		}
	},

	/**
	 * Méthode pour mettre a jour une visite
	 */
	update: async (req, res, next) => {
		try {
			const updatedVisit = await prismaClient.visit.update({
				where: {
					id: Number(req.params.id),
				},
				data: {
					// on ajoute toutes les données présentes dans req.body
					...req.body,
				},
			});
			// on retourne la visite mise à jour
			res.json(updatedVisit);
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
			// on delete l'utilisateur par son id
			await prismaClient.visit.delete({
				where: {
					id: Number(req.params.id),
				},
			});

			// on renvoie un status 204 - no content pour signaler au front que l'utilisateur a bien été supprimé.
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

export default visitsController;
