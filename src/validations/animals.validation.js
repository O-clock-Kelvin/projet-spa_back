/** @format */

import Joi from 'joi';

const animalsValidation = {
	queryFilters: Joi.object({
		id: [
			Joi.number().integer(),
			Joi.object().pattern(/^/, Joi.number().integer()),
		],
		species: Joi.string().uppercase().valid('CAT', 'DOG', 'OTHER'),
		name: [Joi.string(), Joi.object().pattern(/^/, Joi.string())],
		gender: Joi.string().uppercase().valid('MALE', 'FEMALE'),
		size: Joi.string().uppercase().valid('SMALL', 'MEDIUM', 'BIG'),
		volunteer_experience: Joi.string()
			.uppercase()
			.valid('BEGINNER', 'MEDIUM', 'EXPERT'),
		box_id: [
			Joi.number().integer(),
			Joi.object().pattern(/^/, Joi.number().integer()),
		],
	}),

	create: Joi.object({
		species: Joi.string().uppercase().valid('CAT', 'DOG', 'OTHER').required(),
		name: Joi.string().required(),
		bio: Joi.string(),
		url_image: Joi.string().uri(),
		gender: Joi.string().uppercase().valid('MALE', 'FEMALE').required(),
		size: Joi.string().uppercase().valid('SMALL', 'MEDIUM', 'BIG').required(),
		volunteer_experience: Joi.string()
			.uppercase()
			.valid('BEGINNER', 'MEDIUM', 'EXPERT')
			.default('BEGINNER'),
		box_id: Joi.number(),
	}),

	update: Joi.object({
		species: Joi.string().uppercase().valid('CAT', 'DOG', 'OTHER'),
		name: Joi.string(),
		bio: Joi.string(),
		url_image: Joi.string().uri(),
		gender: Joi.string().uppercase().valid('MALE', 'FEMALE'),
		size: Joi.string().uppercase().valid('SMALL', 'MEDIUM', 'BIG'),
		volunteer_experience: Joi.string()
			.uppercase()
			.valid('BEGINNER', 'MEDIUM', 'EXPERT'),
		box_id: Joi.number(),
	}),
};

export default animalsValidation;
