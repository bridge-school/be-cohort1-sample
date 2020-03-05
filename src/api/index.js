const express = require("express");

const { healthRouter } = require('../routes/health/health.router')
const { greatReadsRouter } = require('../routes/greatreads/greatreads.router');

const router = express.Router();
router.use("/health", healthRouter);
router.use("/greatreads", greatReadsRouter);

module.exports = router;
