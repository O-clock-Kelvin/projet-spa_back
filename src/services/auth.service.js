/** @format */
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';

const authService = {
	/**
	 * @description generate an encrypted password
	 * @param {string} unencrypted password
	 * @returns {Promise<string>} hashed password
	 * @example authService.generateHashedPassed('my-clear-password')
	 */
	generateHashedPassword: async (password) => {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	},

	/**
	 * @description Check if an unencrypted password and a crypted password are the same
	 * @param {string} unencrypted password
	 * @param {*} crypted password
	 * @returns {Promise<boolean>} returns true if passwords are the same, false if they're not
	 */
	validatePassword: async (password, hashedPassword) => {
		const comparisonResult = await bcrypt.compare(password, hashedPassword);
		return comparisonResult;
	},

	/**
	 * @description Générate a signed JWT with provided data
	 * @param {object} data
	 * @returns {Promise<string>} signed JWT
	 * @example authService.generateJWT({
	 * id:1,
	 * name:'John',
	 * admin:true
	 * });
	 */
	generateJWT: async (data) => {
		const stringifiedData = JSON.stringify(data);
		return Jwt.sign(stringifiedData, process.env.JWT_KEY);
	},
};

export default authService;
