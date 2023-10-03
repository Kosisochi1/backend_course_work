const fs = require('fs');
const path = require('path');
const detailDbPath = path.join(__dirname, 'detail.json');

const detail_controll = (req, res) => {
	const newDetails = req.body;
	fs.readFile(detailDbPath, 'utf-8', (err, data) => {
		if (err) {
			return res.status(404).json({ error: 'Details not found' });
		}
		const oldDetails = JSON.parse(data);
		if (newDetails.level === 2) {
			newDetails.level_type = 'admin';
		} else {
			newDetails.level_type = 'user';
		}

		const alladetails = [...oldDetails, newDetails];
		const storedDetals = JSON.stringify(alladetails);
		fs.writeFile(detailDbPath, storedDetals, (err) => {
			if (err) {
				return res.status(404).json({ error: 'Not Stored' });
			}
			res.status(201).json({ data: alladetails });
		});
		// console.log(alladetails);
	});
};
module.exports = {
	detail_controll,
};
