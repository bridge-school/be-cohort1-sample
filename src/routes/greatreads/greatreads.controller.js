const fs = require("fs");
const { promisify } = require("util");

const greatReadsData = require("../../../db/greatreads.data.json");

const writeFile = promisify(fs.writeFile);

const listGreatReads = (req, res) => {
  return res.json({
    data: greatReadsData
  });
};

const postGreatReads = async (req, res) => {
  const id = greatReadsData.allBooks.length + 1;
  const newGreatReadsData = {
    allBooks: [...greatReadsData.allBooks, req.body]
  };
  await writeFile("db/greatreads.data.json", JSON.stringify(newGreatReadsData));
  res.status(201);
  return res.json({
    id,
    ...req.body
  });
};

module.exports = {
  listGreatReads,
  postGreatReads
};
