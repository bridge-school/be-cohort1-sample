const express = require('express');

const { listBooks, postBooks } = require("./books.controller");

const router = express.Router();

router.get("", listBooks);
router.post("", postBooks);

module.exports = {
    booksRouter: router
}
