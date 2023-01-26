/** @format */
/**
 * GET /v1/users
 *
 * @format
 * @summary Return all users
 * @tags Users
 
 * @param {number} id.query
 * @param {string } email.query
 * @param {integer} email2.query
 * 
 * @returns {array<User>} 200

 */

/**
 * POST /v1/users
 *
 * @format
 * @summary Create an user
 * @tags Users
 
 * @param {number} id.query
 * @param {string } email.query
 * @param {integer} email2.query

 */

/** @format */
/**
 * GET /v1/users/{id}
 *
 * @format
 * @summary Return an user
 * @tags Users
 * @param {integer} id.path
 */

/** @format */
/**
 * PATCH /v1/users/{id}
 *
 * @format
 * @summary Update an user
 * @tags Users
 * @param {integer} id.path
 */

/** @format */
/**
 * DELETE /v1/users/{id}
 *
 * @format
 * @summary Delete an user
 * @tags Users
 * @param {integer} id.path
 */

/**
 * User Object
 *
 * @format
 * @typedef {object} User
 * @property {integer} id
 * @property {string} email - user email
 * @property {string} firstname - user first name
 * @property {string} name - user name
 * @property {(string|null)} phone_number - user phone number
 * @property {boolean} admin - user admin level
 * @property {string} experience - user experience - enum:BEGINNER,MEDIUM,EXPERT
 * @property {(string|null)} url_image - user profile picture
 */
