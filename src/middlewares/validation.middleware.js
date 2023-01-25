/** @format */
import Joi from 'joi';
import APIError from '../services/APIError.service.js';

const validate = (schema, key) => (req, res, next) => {
	try {
		const validatedValues = Joi.attempt(req[key], schema);
		req[key] = validatedValues;
		next();
	} catch (error) {
		next(
			new APIError({
				error,
			})
		);
	}
};

export default validate;
