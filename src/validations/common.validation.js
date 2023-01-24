/** @format */
import Joi from 'joi';

const commonValidation = {
	idParams: Joi.object({
		id: Joi.number().required(),
	}),
};

export default commonValidation;
