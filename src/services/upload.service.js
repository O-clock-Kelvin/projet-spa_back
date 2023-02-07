import { PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import s3Client from '../s3.js';
import APIError from './APIError.service.js';

const bucketInfo = (name) => {
	if (name) {
		switch (name) {
			case 'animals':
				return {
					bucket: process.env.S3_ANIMAL_PICTURES_BUCKET_NAME,
					publicUrl: `https://${process.env.S3_ANIMAL_PICTURES_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/`,
				};
			case 'users':
				return {
					bucket: process.env.S3_USER_PICTURES_BUCKET_NAME,
					publicUrl: `https://${process.env.S3_USER_PICTURES_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/`,
				};
			default:
				throw new Error('INVALID_UPLOAD_DESTINATION');
		}
	} else {
		throw new Error('INVALID_UPLOAD_DESTINATION');
	}
};

const uploadService = {
	upload: async (destination, fileExtension, body) => {
		if (!destination || !fileExtension || !body) {
			throw new Error('MISSING_UPLOAD_PARAMETER');
		}
		try {
			// On récupère les infos du Bucket AWS S3 ou l'on souhaite uploader l'image
			const { bucket, publicUrl } = bucketInfo(destination);

			// On génère un nom aléatoire, se terminant par l'extension du fichier
			const name = `${crypto.randomUUID()}.${fileExtension}`;

			// On envoie l'image vers s3, les données de l'image sont contenues dans "Body"
			await s3Client.send(
				new PutObjectCommand({
					Region: process.env.REGION,
					Bucket: bucket,
					Key: name,
					Body: body,
				})
			);

			// On retourne le lien de l'image
			return publicUrl + name;
		} catch (error) {
			throw new APIError({
				message: 'UPLOAD_FAILED',
				error,
			});
		}
	},
};

export default uploadService;
