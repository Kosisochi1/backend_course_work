const http = require('http');
const fs = require('fs');
const path = require('path');
const { json } = require('node:stream/consumers');
const DBPATH = path.join(__dirname, 'mb', 'booksDb.json');
const HOSTNAME = 'localhost';
const PORT = 7100;
// const Dbase = [];
//Create Listener Function
const handleListenerF = function (req, res) {
	res.setHeader('Content-Type', 'application/json');

	if (req.url === '/books' && req.method === 'GET') {
		getFunction(req, res);
	} else if (req.url === '/books' && req.method === 'POST') {
		postFunction(req, res);
	} else if (req.url === '/books' && req.method === 'PUT') {
		putFunction(req, res);
	} else if (req.url === '/books' && req.method === 'DELETE') {
		deleteFunction(req, res);
	}
};
//Create Server
const server = http.createServer(handleListenerF);
server.listen(PORT, HOSTNAME, () => {
	console.log(`You started server at ${HOSTNAME}:${PORT}`);
});
// Using the GET method
function getFunction(req, res) {
	fs.readFile(DBPATH, 'utf-8', (err, data) => {
		if (err) {
			res.writeHead(404);
			res.end(JSON.stringify({ massage: 'Not found' }));
		}
		res.writeHead(200);
		res.write('Successful');
		res.write(data);
		res.end();
	});
}
//Using the POST method
function postFunction(req, res) {
	//Getting the data from the client
	const items = [];
	req.on('data', (chunks) => {
		items.push(chunks);
	});
	req.on('end', () => {
		const itemsTOstring = Buffer.concat(items).toString();
		const itemsToJson = JSON.parse(itemsTOstring);
		fs.readFile(DBPATH, 'utf-8', (err, data) => {
			if (err) {
				res.write(404);
				res.end();
			}

			const newbook = JSON.parse(data);
			const lastBook = newbook.length - 1;
			const lastBookId = newbook[lastBook].id;
			itemsToJson.id = lastBookId + 1;
			const allabooks = [...newbook, itemsToJson];
			console.log(allabooks);

			fs.writeFile(DBPATH, JSON.stringify(allabooks), (err) => {
				if (err) {
					res.writeHead(404);
					res.end();
				}
				res.write;
				res.end(JSON.stringify(allabooks));
			});
		});
	});
}
// PUT Function
function putFunction(req, res) {
	const putItem = [];
	req.on('data', (chunks) => {
		putItem.push(chunks);
	});
	req.on('end', () => {
		const putItemToString = Buffer.concat(putItem).toString();
		const putItemToJson = JSON.parse(putItemToString);
		fs.readFile(DBPATH, 'utf-8', (err, data) => {
			if (err) {
				res.writeHead(404);
				res.end();
			}
			const getDataToString = JSON.parse(data);
			const findId = getDataToString.findIndex((dataId) => {
				return dataId.id === putItemToJson.id;
			});
			if (findId === -1) {
				res.writeHead(404);
				res.end();
				return;
			}
			const upDateBook = { ...getDataToString[findId], ...putItemToJson };
			getDataToString[findId] = upDateBook;
			console.log(getDataToString);
			fs.writeFile(DBPATH, JSON.stringify(getDataToString), (err) => {
				if (err) {
					res.writeHead(404);
					res.end();
				}
				res.write('successful updated');
				res.end();
			});
		});
	});
}
// DELETE Function
function deleteFunction(req, res) {
	const itemToDelete = [];
	req.on('data', (chunks) => {
		itemToDelete.push(chunks);
	});
	req.on('end', () => {
		const deleteItemToString = Buffer.concat(itemToDelete).toString();
		const deleteToJson = JSON.parse(deleteItemToString);
		fs.readFile(DBPATH, 'utf-8', (err, data) => {
			if (err) {
				res.writeHead(400);
				res.write({ massage: 'Not can not read file' });
				res.end();
			}
			const checkItemToDel = JSON.parse(data);
			const findDelId = checkItemToDel.findIndex((itemDelId) => {
				return itemDelId.id === deleteToJson.id;
			});
			if (findDelId === -1) {
				res.writeHead(404);
				res.end('No match found');
			}
			const deletedI = checkItemToDel.splice(findDelId, 1);
			console.log();
			fs.writeFile(DBPATH, JSON.stringify(checkItemToDel), (err) => {
				if (err) {
					res.end('deleted');
				}
				res.writeHead(201);
				res.end(JSON.stringify(checkItemToDel));
				console.log(checkItemToDel);
			});
		});
	});
}
