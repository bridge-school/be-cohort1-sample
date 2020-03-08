const express = require("express");

const { listGreatReads, postGreatReads, updateGreatReads, deleteGreatReads } =
  require("./greatreads.controller");

const router = express.Router();

router.get("", listGreatReads);
router.post("", postGreatReads);
router.put("/:bookId", updateGreatReads);
router.delete("/:bookId", deleteGreatReads);

module.exports = {
  greatReadsRouter: router
};
