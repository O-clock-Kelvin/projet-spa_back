/** @format */
import Joi from 'joi';

const userValidation = {
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
		name: Joi.string(),
		phone_number: Joi.string().regex(
			/(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/m
		),
		admin: Joi.boolean(),
		experience: Joi.string().uppercase().valid('BEGINNER', 'MEDIUM', 'EXPERT'),
		url_image: Joi.string().uri(),
	}),
};

export default userValidation;
