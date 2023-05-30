const validateBody = require("./validateBody");
const validateFavorite = require("./validateFavorite");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const upload = require ( './upload')

module.exports = {
	validateBody,
	validateFavorite,
	isValidId,
	authenticate,
	upload, 
};
