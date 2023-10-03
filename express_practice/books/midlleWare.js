const fs = require('fs');
const path = require('path');
const dBPath = path.join(__dirname, '../../mb', 'booksDb.json');

const DbMidlleWare = (req, res) => {
	const reading = fs.readFile(dBPath, 'utf-8', (err, data) => {
		if (err) {
			return res.status(200).json({ error: 'Not Found', data: null });
		}
		const jsonItems = JSON.parse(data);
		return res.status(200).json({ items: jsonItems });
	});
	return reading;
};
module.exports = {
	DbMidlleWare,
};
