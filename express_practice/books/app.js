const express = require('express');
// const path = require('path');
// const fs = require('fs');
const readMidlleWare = require('./midlleWare');
const MiddleWare = require('./generalmiddleWare');
const router = require('./details_route');
const PORT = 5200;
// const dBPath = path.join(__dirname, '../../mb', 'booksDb.json');

const app = express();
app.use(express.json());
app.use('/v1/details/user', router);
app.get('/v1/books', MiddleWare.globalmidWare, readMidlleWare.DbMidlleWare);
// (req, res) => {
// const getBooks = req.body;
// fs.readFile(dBPath, 'utf-8', (err, data) => {
// 	console.log(dBPath);
// 	if (err) {
// 		return res.status(404).json({ error: 'Not Found' });
// 	}
// 	const jsonItems = JSON.parse(data);
// 	res.status(200).json({ item: jsonItems });
// });

// console.log(readMidlleWare.DbMidlleWare(req, res));
// console.log(getBooks);
// });
app.listen(PORT, () => {
	console.log(`you started server at localhost:${PORT}`);
});
