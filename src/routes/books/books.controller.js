const fs = require("fs");
const { promisify } = require("util");
const writeFile = promisify(fs.writeFile);
const { validationResult } = require("express-validator");

const { ErrorHandler } = require("../../middleware/utils")
const { getErrorMessage } = require('./utils')
const { STATUS_CODES } = require('../../constants')
const booksData = require("../../../db/books.json");

const deleteBooks = async (req, res) => {
    await writeFile("db/books.json", JSON.stringify([]));

    return res
        .status(STATUS_CODES["OK"])
        .json({
            data: booksData,
        })
}

const deleteBooksById = async (req, res, next) => {
    const { bookId } = req.params;
    const bookIndex = booksData.findIndex(({ bookID }) => bookID === bookId)

    if (bookIndex === -1) {
        return res
            .status(STATUS_CODES["NOT_FOUND"])
            .json({
                errors: [{
                    msg: getErrorMessage(bookId)
                }]
            });
    }

    const updatedBooksData = [...booksData]
    const deletedBook = updatedBooksData.splice(bookIndex, 1);

    await writeFile("db/books.json", JSON.stringify(updatedBooksData)).catch(error => console.log(error))

    return res
        .status(STATUS_CODES["OK"])
        .json({
            data: deletedBook
        })
}

const getBooks = (req, res) => {
    return res
        .status(STATUS_CODES["OK"])
        .json({
            data: booksData,
        })
}

const getBooksById = (req, res) => {
    const { bookId } = req.params;
    const selectedBook = booksData.filter(({ bookID }) => bookID === bookId);

    if (!selectedBook.length) {
        const errors = [{ msg: getErrorMessage(bookId) }]
        throw new ErrorHandler(STATUS_CODES["NOT_FOUND"], errors)
    }

    return res
        .status(STATUS_CODES["OK"])
        .json({
            data: selectedBook,
        })
}

const postBooks = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(STATUS_CODES["UNPROCESSABLE_ENTITY"])
            .json({ errors: errors.array() });
    }

    const bookID = `${booksData.length + 1}`;
    const doesBookExist = booksData.some(({title}) => req.body.title.toLowerCase() === title.toLowerCase())

    if (doesBookExist) {
        return res
            .status(STATUS_CODES["CONFLICT"])
            .json({
                errors: [{
                    msg: getErrorMessage(null, req.body.title, 409)
                }]
            });
    }

    const updatedBooksData = [...booksData, {...req.body, bookID }];

    await writeFile("db/books.json", JSON.stringify(updatedBooksData));

    return res
        .status(STATUS_CODES["CREATED"])
        .json({
            bookID,
            ...req.body,
        })
}

const putBooksById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(STATUS_CODES["UNPROCESSABLE_ENTITY"])
            .json({ errors: errors.array() });
    }

    const { bookId } = req.params;
    const bookIndex = booksData.findIndex(({ bookID }) => bookID === bookId)

    if (bookIndex === -1) {
        return res
            .status(STATUS_CODES["NOT_FOUND"])
            .json({ errors:
                [{
                    msg: getErrorMessage(bookId)
                }]
            });
    }

    const updatedBook = { ...booksData[bookIndex], ...req.body};
    const updatedBooksData = [...booksData];
    updatedBooksData[bookIndex] = updatedBook

    await writeFile("db/books.json", JSON.stringify(updatedBooksData));

    return res
        .status(STATUS_CODES["OK"])
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
