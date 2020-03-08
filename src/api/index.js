const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const { healthRouter } = require('../routes/health/health.router')
const { booksRouter } = require('../routes/books/books.router')

const router = express.Router();
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.use("/books", booksRouter);
router.use("/health", healthRouter);

module.exports = router;
