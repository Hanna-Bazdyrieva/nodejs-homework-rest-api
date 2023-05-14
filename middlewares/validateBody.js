const { HttpError } = require("../helpers");


function validateBody (schema){

  function func (req, res, next){
    const { error } = schema.validate(req.body);

		if (error) {
      console.log(error.details )
			throw HttpError(400, error.message);
		}
    next()
  }
  return func
}

module.exports = validateBody