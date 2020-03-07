const fs = require("fs");
const { promisify } = require("util");
const writeFile = promisify(fs.writeFile);
const { validationResult } = require("express-validator");

const booksData = require("../../../db/books.json");
const { getErrorMessage } = require('./utils')

const deleteBooks = async (req, res) => {
    await writeFile("db/books.json", JSON.stringify([]));

    return res
        .status(201)
        .json({
            data: booksData,
        })
}

const deleteBooksById = async (req, res) => {
    const { bookId } = req.params;
    const bookIndex = booksData.findIndex(({ bookID }) => bookID === bookId);

    if (bookIndex === -1) {
        return res
            .status(404)
            .json({
                errors: [{
                    message: getErrorMessage(bookId),
                }]
            })
    }

    const updatedBooksData = [...booksData]
    const deletedBook = updatedBooksData.splice(bookIndex, 1);

    await writeFile("db/books.json", JSON.stringify(updatedBooksData));

    return res
        .status(201)
        .json({
            data: deletedBook
        })
}

const getBooks = (req, res) => {
    return res
        .status(200)
        .json({
            data: booksData,
        })
}

const getBooksById = (req, res) => {
    const { bookId } = req.params;
    const selectedBook = booksData.filter(({ bookID }) => bookID === bookId);

    if (!selectedBook.length) {
        return res
            .status(404)
            .json({
                errors: [{
                    message: getErrorMessage(bookId),
                }]
            })
    }

    return res
        .status(200)
        .json({
            data: selectedBook,
        })
}

const postBooks = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const bookID = `${booksData.length + 1}`;
    const doesBookExist = booksData.some(({title}) => req.body.title.toLowerCase() === title.toLowerCase())

    if (doesBookExist) {
        return res
            .status(409)
            .json({
                errors: [{
                    message: getErrorMessage(null, req.body.title, 409),
                }]
            })
    }

    const updatedBooksData = [...booksData, {...req.body, bookID }];

    await writeFile("db/books.json", JSON.stringify(updatedBooksData));

    return res
        .status(201)
        .json({
            bookID,
            ...req.body,
        })
}

const putBooksById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { bookId } = req.params;
    const bookIndex = booksData.findIndex(({ bookID }) => bookID === bookId);

    if (bookIndex === -1){
        return res
            .status(404)
            .json({
                errors: [{
                    message: getErrorMessage(),
                }]
            })
    }

    const updatedBook = { ...booksData[bookIndex], ...req.body};
    const updatedBooksData = [...booksData];
    updatedBooksData[bookIndex] = updatedBook

    await writeFile("db/books.json", JSON.stringify(updatedBooksData));

    return res
        .status(200)
        .json({
            books: updatedBook,
        })
}

module.exports = {
    deleteBooks,
    deleteBooksById,
    getBooks,
    getBooksById,
    postBooks,
    putBooksById,
}
