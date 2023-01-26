/** @format */

const errorMiddleware = {
	// eslint-disable-next-line no-unused-vars
	handleError: (err, req, res, next) => {
		if (process.env.NODE_ENV === 'development') {
			console.log(err);
		}
		res.status(err.code || 500).json({
			message: err.message || 'INTERNAL_ERROR',
			error: err.error,
			stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
		});
	},

	// eslint-disable-next-line no-unused-vars
	notFound: (req, res, next) => {
		res.status(404).json({
			message: 'ENDPOINT_NOT_FOUND',
		});
	},
};

export default errorMiddleware;
