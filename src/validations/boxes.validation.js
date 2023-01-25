/** @format */

import Joi from 'joi';

const boxesValidation = {
	queryFilters: Joi.object({
		id: Joi.number().integer(),
		type: Joi.string().uppercase().valid('CAT', 'DOG', 'OTHER'),

		nbr_of_places: [
			Joi.number().integer().min(1),
			Joi.object().pattern(/^/, Joi.number().integer().min(1)),
		],
		number: Joi.string(),
	}),

	create: Joi.object({
		type: Joi.string()
			.uppercase()
			.valid('CAT', 'DOG', 'OTHER')
			.default('OTHER'),
		nbr_of_places: Joi.number().integer().min(1).required(),
		number: Joi.string().required(),
	}),

	update: Joi.object({
		type: Joi.string().uppercase().valid('CAT', 'DOG', 'OTHER'),
		nbr_of_places: Joi.number().integer().min(1).required(),
		number: Joi.string().required(),
	}),
};

export default boxesValidation;
