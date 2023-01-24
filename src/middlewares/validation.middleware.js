/** @format */
import Joi from 'joi';

const validate = (schema, key) => (req, res, next) => {
	try {
		const validatedValues = Joi.attempt(req[key], schema);
		req[key] = validatedValues;
		next();
	} catch (error) {
		/**
		 * @todo error handling
		 */
		console.log('ERROR', error);
		throw new Error(error);
	}
};

export default validate;
