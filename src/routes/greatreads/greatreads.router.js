const express = require("express");

const { listGreatReads, postGreatReads } = require("./greatreads.controller");

const router = express.Router();

router.get("", listGreatReads);
router.post("", postGreatReads);

module.exports = {
  greatReadsRouter: router
};
