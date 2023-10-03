const fs = require('fs');
const path = require('path');
const pathToDb = path.join(__dirname, 'detail.json');

const globalmidWare = (req, res, next) => {
	const authHeader = req.headers.authorization;
	console.log(authHeader);

	if (!authHeader) {
		return res.status(401).json({ error: 'You are not authenticated' });
	}
	const base64 = new Buffer.from(authHeader.split(' ')[1], 'base64');
	const baseToString = base64.toString();
	const nameAndpassword = baseToString.split(':');
	const auth = nameAndpassword;
	const Username = auth[0];
	const Password = auth[1];
	fs.readFile(pathToDb, 'utf-8', (err, data) => {
		if (err) {
			return res.status(400).json({ error: 'No data retuned' });
		}
		const dataBase = JSON.parse(data);
		const existingDetail = dataBase.find((user) => {
			return user.name === Username && user.password === Password;
		});
		if (existingDetail) {
			req.user = existingDetail;
			next();
		} else {
			return res.status(404).json({ error: 'Not authenticated' });
		}
	});
};
module.exports = {
	globalmidWare,
};
