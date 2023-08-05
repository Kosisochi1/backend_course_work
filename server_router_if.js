const http = require('http');
const { books, authors } = require('./books');

const HOSTNAME = 'localhost';
const PORT = 7000;
const handlelistenerFunc = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	if (req.url === '/books') {
		res.end(JSON.stringify(books));
	} else if (req.url === '/authors') {
		res.end(JSON.stringify(authors));
	} else {
		res.end(JSON.stringify({ massage: 'Not found' }));
	}
};
const server = http.createServer(handlelistenerFunc);
server.listen(PORT, HOSTNAME, () => {
	console.log('Your server started');
});
