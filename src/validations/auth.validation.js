/** @format */

import Joi from 'joi';

const authValidation = {
	loginBody: Joi.object({
		email: Joi.string().email().lowercase().required(),
		password: Joi.string().min(8).required(),
	}),
};
export default authValidation;
