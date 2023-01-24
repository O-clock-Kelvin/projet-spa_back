/** @format */

import prismaClient from '../prisma.js';
import authService from '../services/auth.service.js';

const usersController = {
	/**
	 * Méthode pour récupérer tous les utilisateurs en base de donnée
	 */
	getAllUsers: async (req, res) => {
		try {
			const users = await prismaClient.user.findMany();
			res.json(users);
		} catch (error) {
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},

	/**
	 * Méthode pour récupérer un utilisateur en particuliers
	 */
	getOne: async (req, res) => {
		try {
			const user = await prismaClient.user.findUnique({
				where: {
					id: Number(req.params.id), // on converti l'id en number car il arrive depuis req.params en string
				},
			});
			res.json(user);
		} catch (error) {
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},

	/**
	 * Méthode pour créer un nouvel utilisateur
	 */
	create: async (req, res) => {
		try {
			// on crypte le mot de passe
			const hashedPassword = await authService.generateHashedPassword(
				req.body.password
			);

			// on crée le nouvel utilisateur en base de donnée
			const createdUser = await prismaClient.user.create({
				data: {
					email: req.body.email.toLowerCase(),
					password: hashedPassword,
					phone_number: req.body.phone_number,
					name: req.body.name,
					firstname: req.body.firstname,
					admin: req.body.admin || false,
					experience: req.body.experience || 'BEGINNER',
				},
			});

			// on retire le mot de passe de l'objet final
			delete createdUser.password;

			// on renvoie les données créées
			res.status(201).json(createdUser);
		} catch (error) {
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},

	/**
	 * Méthode pour mettre a jour un utilisateur spécifique
	 */
	update: async (req, res) => {
		try {
			// si on cherche à modifier le mot de passe
			let newPassword;
			if (req.body.password) {
				newPassword = await authService.generateHashedPassword(
					req.body.password
				);
			}

			// on modifie l'utilisateur
			const updatedUser = await prismaClient.user.update({
				where: {
					// on cherche l'utilisateur par son id, on convert en number
					id: Number(req.params.id),
				},
				data: {
					// on ajoute toutes les données présentes dans req.body
					...req.body,
					// on ajoute le nouveau password, si pas newPassword=undefined, prisma ne modifiera pas le champ en base de donnée.
					password: newPassword,
				},
			});
			// on retire le mot de passe de l'objet retourné
			delete updatedUser.password;

			// on retourne l'utilisateur mis à jour
			res.json(updatedUser);
		} catch (error) {
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},

	/**
	 * Méthode pour supprimer un utilisateur
	 */
	delete: async (req, res) => {
		try {
			// on delete l'utilisateur par son id
			await prismaClient.user.delete({
				where: {
					id: Number(req.params.id),
				},
			});

			// on renvoie un status 204 - no content pour signaler au front que l'utilisateur a bien été supprimé.
			res.status(204).json([]);
		} catch (error) {
			/**
			 * @todo error handling
			 */
			throw new Error(error);
		}
	},
};

export default usersController;
