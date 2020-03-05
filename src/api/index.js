const express = require("express");

const { healthRouter } = require('../routes/health/health.router')
const { booksRouter } = require('../routes/books/books.router')

const router = express.Router();
router.use("/books", booksRouter);
router.use("/health", healthRouter);


module.exports = router;
