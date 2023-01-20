/** @format */

import prismaClient from '../prisma.js';
import authService from '../services/auth.service.js';

const authController = {
	/**
	 *
	 * @param {string} email
	 * @param {string} password
	 * @returns {Promise<string>} signed JWT
	 */
	login: async (email, password) => {
		try {
			const user = await prismaClient.user.findUnique({
				where: {
					email, // équivaut à email:email
				},
			});

			if (user) {
				console.log(user);
				const passwordValidation = await authService.validatePassword(
					password,
					user.password
				);

				if (passwordValidation) {
					const signedJwt = authService.generateJWT({
						id: user.id,
						admin: user.admin ?? false,
						firstName: user.firstname,
						experience: user.experience ?? 'BEGINNER',
					});
					return signedJwt;
				}
				return null;
			}
			return null;
			// que faire quand pas d'utilisateur ?
		} catch (error) {
			/** @todo Error handling */
			console.log(error);
			return null;
		}
	},
};
export default authController;
