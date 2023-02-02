/** @format */
import Jwt from 'jsonwebtoken';

/**
 * @description Vérifie le JWT puis attaches les données de l'utilisateur à la requête
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @example app.get('/protectedroute,authMiddleware,routeController)
 */
const authentification = (req, res, next) => {
	if (
		req.headers &&
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer ')
	) {
		const jwt = req.headers.authorization.split(' ')[1]; // on découpe la string en 2 parties, à partir du premier espace, puis on selectionne directement la 2ème partie découpée

		try {
			const verifiedJWT = Jwt.verify(jwt, process.env.JWT_KEY); // on vérifie que le JWT est valide et n'a pas été modifié

			// on attache les données du JWT décryptées à la requête, pour pouvoir l'utiliser dans nos routes
			req.user = {
				id: verifiedJWT.id,
				admin: verifiedJWT.admin ?? false,
				firstName: verifiedJWT.firstName,
				experience: verifiedJWT.experience ?? 'BEGINNER',
			};
			next();
		} catch (jwtVerificationError) {
			res.status(401).json({ message: 'INVALID_TOKEN' });
		}
	} else {
		res.status(401).send({ message: 'MISSING_TOKEN' });
	}
};
export default authentification;
