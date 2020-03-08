const express = require("express");

const { listGreatReads, postGreatReads, updateGreatReads } = require("./greatreads.controller");

const router = express.Router();

router.get("", listGreatReads);
router.post("", postGreatReads);
router.put("/:bookId", updateGreatReads);

module.exports = {
  greatReadsRouter: router
};
