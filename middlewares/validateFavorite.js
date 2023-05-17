const { HttpError } = require("../helpers");

function validateFavorite(schema) {
	function func(req, res, next) {
		const { error } = schema.validate(req.body);

		if (error) {
			console.log(error.message);
			const message = `missing field ${error.details[0].context.label}`;
			throw HttpError(400, message);
		}
		next();
	}
	return func;
}

module.exports = validateFavorite;
