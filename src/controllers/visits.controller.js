/** @format */

import prismaClient from '../prisma.js';

const visitsController = {
	// Méthode pour récupérer la liste des visites
	getAll: async (req, res) => {
		try {
			const visits = await prismaClient.visit.findMany({});
			res.json(visits);
		} catch (error) {
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},

	// Méthode pour récupérer la liste des visites d'une boxe en particulier
	getOne: async (req, res) => {
		try {
			const visitsOneBox = await prismaClient.visitsOneBox.findUnique({
				where: {
					id: Number(req.params.id), // on converti l'id en number car il arrive depuis req.params en string
				},
			});
			res.json(visitsOneBox);
		} catch (error) {
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},


	// Méthode pour créer une nouvelle visite
	create: async (req, res) => {
		try {
			const createdVisit = await prismaClient.visit.create({
				/**
				 * req.body = {
				 *  box_id:1,
				 * user_id:23,
				 * comment:"Mon commentaire"
				 * }
				 */
				data: req.body
				// data: {

				//     box_id: req.body.box_id
				//     user_id: req.body.user_id
				//     comment: req.body.comment,                
				// },
			});

			// on renvoie les données créées
			res.status(201).json(createdVisit);

		} catch (error) {
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},

	/**
	 * Méthode pour mettre a jour une visite
	 */
	update: async (req, res) => {
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
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},
};

export default visitsController;