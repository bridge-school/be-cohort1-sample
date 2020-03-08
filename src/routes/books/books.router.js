const express = require('express');
const { check } = require("express-validator");

const { validateBody } = require("../../middleware/validate-body")

const {
    deleteBooks,
    deleteBooksById,
    getBooks,
    getBooksById,
    postBooks,
    putBooksById
 } = require("./books.controller");

const router = express.Router();

router.delete("", deleteBooks);
router.delete("/:bookId", deleteBooksById);
router.get("", getBooks);
router.get("/:bookId", getBooksById);
router.post(
    "",
    [
        check("title")
            .isString()
            .trim()
            .not()
            .isEmpty(),
        check("authors")
            .isString()
            .trim()
            .not()
            .isEmpty(),
        check("average_rating")
            .not()
            .isEmpty(),
        check("isbn")
            .not()
            .isEmpty(),
        check("isbn13")
            .isISBN('13')
            .not()
            .isEmpty(),
        check("language_code")
            .isString()
            .not()
            .isEmpty(),
        check("# num_pages")
            .not()
            .isEmpty(),
        check("ratings_count")
            .not()
            .isEmpty(),
        check("text_reviews_count")
            .not()
            .isEmpty()
    ],
    validateBody,
    postBooks
);

router.put(
    "/:bookId",
    [
        check("title")
            .isString()
            .trim()
            .not()
            .isEmpty(),
        check("authors")
            .isString()
            .trim()
            .not()
            .isEmpty(),
        check("average_rating")
            .not()
            .isEmpty(),
        check("isbn")
            .not()
            .isEmpty(),
        check("isbn13")
            .isISBN('13')
            .not()
            .isEmpty(),
        check("language_code")
            .isString()
            .not()
            .isEmpty(),
        check("# num_pages")
            .not()
            .isEmpty(),
        check("ratings_count")
            .not()
            .isEmpty(),
        check("text_reviews_count")
            .not()
            .isEmpty()
    ],
    validateBody,
    putBooksById
);

module.exports = {
    booksRouter: router
}
