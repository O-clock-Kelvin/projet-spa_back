/**
 * Auth request body
 *
 * @format
 * @typedef {object} AuthPayload
 * @property {string} email.required - user email
 * @property {string} password.required - user password
 */

/**
 * Valid auth response
 * @format
 * @typedef {object} ValidAuthResponse
 * @property {string} token - the JWT Token
 */

/**
 * Invalid auth response
 * @format
 * @typedef {object} InvalidAuthResponse
 * @property {string} message - auth error - enum:INVALID_PASSWORD,INVALID_USER
 */

/**
 * Generic error
 * @format
 * @typedef {object} error
 * @property {string} message - message to describe error - enum: INTERNAL_ERROR, INVALID_SORT_PARAMETER
 */
