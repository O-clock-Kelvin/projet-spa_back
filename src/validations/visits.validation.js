/** @format */

import Joi from 'joi';

const visitsValidation = {
	getFilters: Joi.object({
		user_id: Joi.number().integer(),
		box_id: Joi.number().integer(),
		date: Joi.object().pattern(/^/, Joi.date()),
		feeling: Joi.string().uppercase().valid('BAD', 'MEDIUM', 'GOOD'),
	}),

	create: Joi.object({
		user_id: Joi.number().integer().required(),
		box_id: Joi.number().integer().required(),
		comment: Joi.string(),
		feeling: Joi.string()
			.uppercase()
			.valid('BAD', 'MEDIUM', 'GOOD')
			.default('GOOD'),
		date: Joi.date().default(new Date()),
	}),

	update: Joi.object({
		user_id: Joi.number().integer(),
		box_id: Joi.number().integer(),
		comment: Joi.string().allow(null, ''),
		feeling: Joi.string().uppercase().valid('BAD', 'MEDIUM', 'GOOD'),
		date: Joi.date(),
		end_date: Joi.date(),
	}),
};
export default visitsValidation;
