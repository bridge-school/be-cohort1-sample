const fs = require("fs");
const { promisify } = require("util");
const booksData = require("../../../db/books.json");
const writeFile = promisify(fs.writeFile);

const listBooks = (req, res) => {
    return res.json({
        book: booksData,
    })
}

const postBooks = async (req, res) => {
    const bookID = booksData.length + 1;
    const newBooksData = [...booksData, {...req.body, bookID }];
    await writeFile("db/books.json", JSON.stringify(newBooksData));
    res.status(201)
    return res.json({
        bookID,
        ...req.body,
    })
}


module.exports = {
    listBooks,
    postBooks,
}
