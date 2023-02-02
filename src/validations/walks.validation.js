/** @format */

import Joi from 'joi';

const walksValidation = {
	getFilters: Joi.object({
		id: Joi.number().integer().min(1),
		user_id: Joi.number().integer().min(1),
		animal_id: Joi.number().integer().min(1),
		feeling: Joi.string().uppercase().valid('BAD', 'MEDIUM', 'GOOD'),
		date: Joi.object().pattern(/^/, Joi.date()),
	}),

	create: Joi.object({
		user_id: Joi.number().integer().required(),
		animal_id: Joi.number().integer().required(),
		comment: Joi.string(),
		feeling: Joi.string()
			.uppercase()
			.valid('BAD', 'MEDIUM', 'GOOD')
			.default('GOOD'),
		date: Joi.date().default(new Date()),
	}),

	update: Joi.object({
		user_id: Joi.number().integer(),
		animal_id: Joi.number().integer(),
		comment: Joi.string().allow(null, ''),
		feeling: Joi.string().uppercase().valid('BAD', 'MEDIUM', 'GOOD'),
		date: Joi.date(),
		end_date: Joi.date(),
	}),
};
export default walksValidation;
