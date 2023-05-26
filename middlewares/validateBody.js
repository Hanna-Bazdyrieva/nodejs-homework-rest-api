const { HttpError } = require("../helpers");

function validateBody(schema) {

	function func(req, res, next) {

		if (Object.keys(req.body).length === 0) {

			throw HttpError(400, "Missing fields");

		} else {

			const { error } = schema.validate(req.body);

			if (error) {
				const message = `Missing required ${error.details[0].context.label} field`;
				throw HttpError(400, message);
			}
		}
		next();
	}
	return func;
}

module.exports = validateBody;
