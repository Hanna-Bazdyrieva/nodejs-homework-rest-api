const Joi = require("joi");

const addSchema = Joi.object({
	name: Joi.string().min(3).max(30).required(),
	email: Joi.string().email(),
	phone: Joi.string()
		.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)
		.required(),
});

module.exports = {
  addSchema
}