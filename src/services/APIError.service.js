/** @format */
import { Prisma } from '@prisma/client';
import Joi from 'joi';
/** @format */

class APIError extends Error {
	/**
	 * @param {Object} errorObject
	 * @param {Error} errorObject.error
	 * @param {code} errorObject.code
	 * @param {message} errorObject.message
	 */
	constructor(errorObject) {
		super(errorObject.error);

		this.error = errorObject.error;
		this.code = errorObject.code || 500;
		this.message = errorObject.message || 'INTERNAL_ERROR';
		this.stack = errorObject.error ? errorObject.error.stack : undefined;

		// on vient utiliser cette methode pour savoir si on connait le type d'erreur, auquel cas on pourra la traiter différemment
		this.handleErrorType();
	}

	handleErrorType = () => {
		if (this.error instanceof Prisma.PrismaClientKnownRequestError) {
			switch (this.error.code) {
				case 'P2002':
					this.code = 409;
					this.message = 'DATA_NOT_UNIQUE';
					this.error = this.error.meta.target;
					break;
				/**
				 * 2015 - A related record could not be found
				 */

				default:
					break;
			}
		}

		if (this.error instanceof Joi.ValidationError) {
			this.code = 400;
			this.message = 'BAD_INPUT';
		}
	};
}
export default APIError;
