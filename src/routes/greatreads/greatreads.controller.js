const fs = require("fs");
const { promisify } = require("util");

const greatReadsData = require("../../../db/greatreads.data.json");

const writeFile = promisify(fs.writeFile);

const listGreatReads = (req, res) => {
  res.status(200);
  return res.json({
    data: greatReadsData
  });
};

const postGreatReads = async (req, res) => {
  const id = greatReadsData.allBooks.length + 1;
  const newGreatReadsData = {
    allBooks: [...greatReadsData.allBooks, {...req.body, bookID: id}]
  };
  await writeFile("db/greatreads.data.json", JSON.stringify(newGreatReadsData));
  res.status(201);
  return res.json({
    id,
    ...req.body
  });
};

const updateGreatReads = async (req, res) => {
  const bookId = req.params.bookId;
  const isBookUpdated = typeof greatReadsData.allBooks.find(book => bookId === book.bookID)
    !== "undefined";
  const updatedGreadReadsData = {
    allBooks: [...greatReadsData.allBooks.filter(book => bookId !== book.bookID),
      {...req.body, bookID: bookId}
    ]
  };
  await writeFile("db/greatreads.data.json", JSON.stringify(updatedGreadReadsData));
  if(isBookUpdated) {
    return res.status(204).send("Book found and updated.");
  }
  res.status(201);
  return res.json({
    bookId,
    ...req.body
  });
};

const deleteGreatReads = async (req, res) => {
  const bookId = req.params.bookId;
  const isBookInDb = typeof greatReadsData.allBooks.find(book => bookId === book.bookID)
    !== "undefined";
  const updatedGreadReadsData = {
    allBooks: [...greatReadsData.allBooks.filter(book => bookId !== book.bookID)]
  };
  await writeFile("db/greatreads.data.json", JSON.stringify(updatedGreadReadsData));
  if(isBookInDb) {
    return res.status(204).send("Book(s) deleted.");
  }
  return res.status(404).send("Book(s) not found");
};

module.exports = {
  listGreatReads,
  postGreatReads,
  updateGreatReads,
  deleteGreatReads
};
