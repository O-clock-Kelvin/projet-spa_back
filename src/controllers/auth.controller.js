/** @format */

import prismaClient from '../prisma.js';
import authService from '../services/auth.service.js';
import APIError from '../services/APIError.service.js';

const authController = {
	/**
	 *
	 * @param {string} email
	 * @param {string} password
	 * @returns {Promise<string>} signed JWT
	 */
	login: async (req, res, next) => {
		const { email, password } = req.body;
		try {
			const user = await prismaClient.user.findUnique({
				where: {
					email, // équivaut à email:email
				},
			});

			if (user) {
				const passwordValidation = await authService.validatePassword(
					password,
					user.password
				);

				if (passwordValidation) {
					const signedJwt = await authService.generateJWT({
						id: user.id,
						admin: user.admin ?? false,
						firstName: user.firstname,
						experience: user.experience ?? 'BEGINNER',
					});
					// on retourne un JWT signé pour vérifier sa validité
					res.json({ token: signedJwt });
				}

				res.status(401).json({ message: 'INVALID_PASSWORD' });
			}

			res.status(401).json({ message: 'INVALID_USER' });
		} catch (error) {
			next(
				new APIError({
					error,
				})
			);
		}
	},
};
export default authController;
