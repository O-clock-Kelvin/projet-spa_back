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
	login: async (req, res) => {
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
				// si le mot de passe n'est pas valide
				res.status(401).json();
			}
			// si l'email n'est associé à aucun compte
			res.status(401).json();
		} catch (error) {
			/** @todo Error handling */
			console.log(error);
			throw new Error('Error');
		}
	},
};
export default authController;
