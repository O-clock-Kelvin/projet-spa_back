/** @format */

import Joi from 'joi';

const boxesValidation = {
	idParams: Joi.object({
		id: Joi.number().required(),
	}),

	create: Joi.object({
		type: Joi.string()
			.uppercase()
			.valid('CAT', 'DOG', 'OTHER')
			.default('OTHER'),
		nbr_of_places: Joi.number().min(1).required(),
		number: Joi.string().required(),
	}),

	update: Joi.object({
		type: Joi.string()
			.uppercase()
			.valid('CAT', 'DOG', 'OTHER')
			.default('OTHER'),
		nbr_of_places: Joi.number().min(1).required(),
		number: Joi.string().required(),
	}),
};

export default boxesValidation;
