const joi = require('joi');
const createValidation = async (req, res, next) => {
	try {
		const schema = joi.object({
			id: joi.number().required(),
			firstName: joi.string().required(),
			lastName: joi.string().required(),
			email: joi.string().required(),
			password: joi.string().required(),
			Sex: joi.string().required(),
		});
		await schema.validateAsync(req.body, { abortEarly: true });
		next();
	} catch (error) {
		return res.status(422).json({
			massage: error.massage,
			success: false,
		});
	}
};

module.exports = {
	createValidation,
};
