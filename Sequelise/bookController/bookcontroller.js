// const BookModel = require('../models/book');
const db = require('../models');

const BookModel = db.books;
async function getAllBook(req, res, next) {
	try {
		const books = await BookModel.findAll();
		res.status(200).json(books);
	} catch (error) {
		res.status(500).send(error);
		next(error);
	}
}
async function addBook(req, res, next) {
	const newBook = req.body;
	try {
		const books = await BookModel.create(newBook);
		res.status(201).json(books);
	} catch (error) {
		next(error);
	}
}
module.exports = {
	getAllBook,
	addBook,
};
