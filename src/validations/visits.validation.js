/** @format */

import Joi from 'joi';

const visitsValidation = {
	getFilters: Joi.object({
		user_id: Joi.number().integer(),
		box_id: Joi.number().integer(),
		date: Joi.object().pattern(/^/, Joi.date()),
	}),

	create: Joi.object({
		user_id: Joi.number().integer().required(),
		box_id: Joi.number().integer().required(),
		comment: Joi.string(),
		date: Joi.date().default(new Date()),
	}),

	update: Joi.object({
		user_id: Joi.number().integer(),
		box_id: Joi.number().integer(),
		comment: Joi.string(),
		date: Joi.date(),
	}),
};
export default visitsValidation;
