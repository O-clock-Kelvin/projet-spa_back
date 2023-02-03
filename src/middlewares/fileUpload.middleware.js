import multer from 'multer';
import APIError from '../services/APIError.service.js';

// On défini qu'on souhaite que le fichier reste dans la mémoire vive du serveur et qu'il ne soit pas enregistré dans un dossier de notre application
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
	/**
	 * On vérifie que le fichier envoyé est bien une image
	 */
	if (
		file.mimetype === 'image/gif' ||
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'image/webp'
	) {
		// on passe "true" pour signifier que le fichier est valide, et passer a l'étape suivante de la requête
		cb(null, true);
	} else {
		cb(
			new APIError({
				code: 400,
				message: 'INVALID_PICTURE_FORMAT',
			})
		);
	}
};

const fileUpload = multer({
	fileFilter,
	storage,
});

export default fileUpload;
