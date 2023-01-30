/** @format */
import Joi from 'joi';

const userValidation = {
	queryFilters: Joi.object({
		id: [
			// l'ID peut être uniquement un nombre (ex: id=1)
			Joi.number().integer(),

			/**
			 * L'ID peut également être un un object contenant plusieurs élément de type nombre
			 * ex:
			 * id:{
			 * 		gte:10
			 * 		lte:20
			 * }
			 */
			Joi.object().pattern(/^/, Joi.number().integer()),
		],

		/** email[contains] = @gmail.com
		 * email:{
		 * 		contains: "@gmail.com"
		 * }
		 */
		email: [
			/**
			 * email=toto@gmail.com
			 */
			Joi.string(),

			/**
			 * email:{
			 * 		contains: "@gmail.com" <= type string
			 * }
			 */
			Joi.object().pattern(/^/, Joi.string()),
		],
		firstname: [Joi.string(), Joi.object().pattern(/^/, Joi.string())],
		name: [Joi.string(), Joi.object().pattern(/^/, Joi.string())],
		admin: Joi.boolean(),
		experience: Joi.string().uppercase().valid('BEGINNER', 'MEDIUM', 'EXPERT'),
	}),

	create: Joi.object({
		email: Joi.string().email().lowercase().required(),
		password: Joi.string().min(8).required(),
		firstname: Joi.string().required(),
		name: Joi.string().required(),
		// regex pour valider les numéros francais,
		phone_number: Joi.string().regex(
			/(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/m
		),
		admin: Joi.boolean().default(false),
		experience: Joi.string()
			.uppercase()
			.valid('BEGINNER', 'MEDIUM', 'EXPERT')
			.default('BEGINNER'),
		url_image: Joi.string().uri(),
	}),

	update: Joi.object({
		email: Joi.string().email().lowercase(),
		password: Joi.string().min(8),
		firstname: Joi.string(),
		name: Joi.string().allow(null),
		phone_number: Joi.string()
			.allow(null)
			.regex(
				/(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/m
			),
		admin: Joi.boolean(),
		experience: Joi.string().uppercase().valid('BEGINNER', 'MEDIUM', 'EXPERT'),
		url_image: Joi.string().uri(),
	}),
};

export default userValidation;
