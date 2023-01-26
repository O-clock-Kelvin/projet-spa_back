/** @format */

import Joi from 'joi';

const walksValidation = {
	getFilters: Joi.object({
		id: Joi.number().integer().min(1),
		user_id: Joi.number().integer().min(1),
		animal_id: Joi.number().integer().min(1),
		feeling: Joi.string().uppercase().valid('BAD', 'MEDIU', 'GOOD'),
		date: Joi.object().pattern(/^/, Joi.date()),
	}),
};
export default walksValidation;
