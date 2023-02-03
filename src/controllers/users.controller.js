/** @format */

import prismaClient from '../prisma.js';
import APIError from '../services/APIError.service.js';
import authService from '../services/auth.service.js';
import mailService from '../services/mail.service.js';
import uploadService from '../services/upload.service.js';

const usersController = {
	/**
	 * Méthode pour récupérer tous les utilisateurs en base de donnée
	 */
	getAllUsers: async (req, res, next) => {
		try {
			const users = await prismaClient.user.findMany({
				// la fonction d'exclusion de champs n'existe pas avec prisma à l'heure actuelle
				// une issue est en cours pour ajouter cette fonction: https://github.com/prisma/prisma/issues/5042
				select: {
					id: true,
					email: true,
					password: false, // on retire le password
					firstname: true,
					name: true,
					admin: true,
					experience: true,
					phone_number: true,
					url_image: true,
				},
				where: req.filters,
				orderBy: req.sort,
				skip: req.pagination.skip,
				take: req.pagination.take,
			});
			res.json(users);
		} catch (error) {
			next(
				new APIError({
					error,
				})
			);
		}
	},

	/**
	 * Méthode pour récupérer un utilisateur en particuliers
	 */

	getOne: async (req, res, next) => {
		try {
			const user = await prismaClient.user.findUnique({
				where: {
					id: req.params.id, // on converti l'id en number car il arrive depuis req.params en string
				},
				select: {
					id: true,
					email: true,
					password: false, // on retire le password
					firstname: true,
					name: true,
					admin: true,
					experience: true,
					phone_number: true,
					url_image: true,
				},
			});
			if (user) {
				res.json(user);
			} else {
				res.status(404).json({ message: 'NOT_FOUND' });
			}
		} catch (error) {
			next(
				// par défaut: code d'erreur 500, message (envoyé au client):"INTERNAL_ERROR", extendMessage:error
				new APIError({
					error,
				})
			);
		}
	},

	/**
	 * Méthode pour créer un nouvel utilisateur
	 */

	create: async (req, res, next) => {
		try {
			// on crypte le mot de passe
			if (req.user.admin === true) {
				const hashedPassword = await authService.generateHashedPassword(
					req.body.password
				);

				if (req.file) {
					const fileExtension = req.file.originalname.split('.').pop();

					const urlImage = await uploadService.upload(
						'users',
						fileExtension,
						req.file.buffer
					);

					req.body.url_image = urlImage;
				}
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
						url_image: req.body.url_image,
					},
				});

				// On envoie un mail à l'aide de notre service
				await mailService.sendTemplateEmail({
					senderName: 'ToutOPoils',
					senderEmail: 'contact@toutopoils.fr',
					recipient: createdUser.email,
					title: `Bienvenue sur ToutOPoils !`,
					template: 'register',
					data: {
						user: createdUser.firstname,
						password: req.body.password,
					},
				});

				delete createdUser.password;

				// on renvoie les données créées
				res.status(201).json(createdUser);
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

	/**
	 * Méthode pour mettre a jour un utilisateur spécifique
	 */
	update: async (req, res, next) => {
		try {
			if (req.file) {
				const fileExtension = req.file.originalname.split('.').pop();

				const urlImage = await uploadService.upload(
					'users',
					fileExtension,
					req.file.buffer
				);

				req.body.url_image = urlImage;
			}

			if (req.params.id === req.user.id || req.user.admin === true) {
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

				let jwt;
				if (req.params.id === req.user.id) {
					jwt = await authService.generateJWT({
						id: req.user.id,
						admin: updatedUser.admin ?? false,
						firstName: updatedUser.firstname,
						experience: updatedUser.experience ?? 'BEGINNER',
					});
				}
				// on retourne l'utilisateur mis à jour
				res.json({ data: updatedUser, token: jwt });
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

	/**
	 * Méthode pour supprimer un utilisateur
	 */
	delete: async (req, res, next) => {
		try {
			if (req.params.id === req.user.id || req.user.admin === true) {
				// on delete l'utilisateur par son id

				await prismaClient.user.delete({
					where: {
						id: Number(req.params.id),
					},
				});

				// on renvoie un status 204 - no content pour signaler au front que l'utilisateur a bien été supprimé.
				res.status(204).json([]);
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

export default usersController;
