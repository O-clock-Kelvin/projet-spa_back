/** @format */
/**
 * POST /v1/auth/login
 *
 * @format
 * @summary Used to log the user and return a JWT if valid
 * @tags auth
 * @param {AuthPayload} request.body.required - user email
 * @return {ValidAuthResponse} 200 - success response - application/json
 * @return {InvalidAuthResponse} 401 - invalid credentials - application/json
 * @return {error} 500 - internal error - application/json
 */
