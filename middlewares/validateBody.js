const { HttpError } = require("../helpers");

function validateBody(schema) {
	function func(req, res, next) {

		if (Object.keys(req.body).length === 0) {

			const message = "missing fields";
			throw HttpError(400, message);
		} else {
			const { error } = schema.validate(req.body);

			if (error) {

				const message = `missing required ${error.details[0].context.label} field`;
				throw HttpError(400, message);
			}
		}

		next();
	}
	return func;
}

module.exports = validateBody;
