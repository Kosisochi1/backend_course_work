const validateDetails = (req, res, next) => {
	if (!req.body.name || !req.body.name.trim()) {
		return res.status(400).json({ error: 'Please input name' });
	}
	if (!req.body.password || !req.body.password.trim()) {
		return res.status(400).json({ error: 'Please input password' });
	}
	next();
};
module.exports = {
	validateDetails,
};
