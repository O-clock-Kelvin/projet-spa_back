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
		age: [
			Joi.date().iso().options({ convert: true }),
			Joi.object().pattern(/^/, Joi.date().iso().options({ convert: true })),
		],

		tagsList: [
			Joi.number().integer().min(1),
			Joi.array().items(Joi.number().integer().min(1)),
		],
		volunteer_experience: [
			Joi.string().uppercase().valid('BEGINNER', 'MEDIUM', 'EXPERT'),
			Joi.array().items(
				Joi.string().uppercase().valid('BEGINNER', 'MEDIUM', 'EXPERT')
			),
		],
		box_id: [
			Joi.number().integer(),
			Joi.object().pattern(/^/, Joi.number().integer()),
		],
	}),

	create: Joi.object({
		species: Joi.string().uppercase().valid('CAT', 'DOG', 'OTHER').required(),
		name: Joi.string().required(),
		bio: Joi.string().allow('', null),
		url_image: Joi.string().uri(),
		age: Joi.date().required(),
		gender: Joi.string().uppercase().valid('MALE', 'FEMALE').required(),
		size: Joi.string().uppercase().valid('SMALL', 'MEDIUM', 'BIG').required(),
		tags: [Joi.string(), Joi.array().items(Joi.number().integer().min(1))],
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
		age: Joi.date(),
		gender: Joi.string().uppercase().valid('MALE', 'FEMALE'),
		size: Joi.string().uppercase().valid('SMALL', 'MEDIUM', 'BIG'),
		volunteer_experience: Joi.string()
			.uppercase()
			.valid('BEGINNER', 'MEDIUM', 'EXPERT'),
		box_id: Joi.number(),
	}),
};

export default animalsValidation;
