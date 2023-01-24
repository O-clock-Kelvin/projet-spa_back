/** @format */

import Joi from 'joi';

const visitsValidation = {
	create: Joi.object({
		user_id: Joi.number().required(),
		box_id: Joi.number().required(),
		comment: Joi.string(),
		date: Joi.date().default(new Date()),
	}),

	update: Joi.object({
		user_id: Joi.number(),
		box_id: Joi.number(),
		comment: Joi.string(),
		date: Joi.date(),
	}),
};
export default visitsValidation;
