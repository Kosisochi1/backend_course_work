const http = require('http');
const { books, authors } = require('./books');
const HOSTNAME = 'localhost';
const PORT = 8080;
const handleListener = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	switch (req.url) {
		case '/books':
			res.end(JSON.stringify(books));
			break;
		case '/authors':
			res.end(JSON.stringify(authors));
			break;
		default:
			res.writeHead(404);
			res.end(JSON.stringify({ massage: 'Not found' }));
	}
};
const server = http.createServer(handleListener);
server.listen(PORT, HOSTNAME, () => {
	console.log(`You just started server at ${HOSTNAME}:${PORT} `);
});
