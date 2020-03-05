const booksData = require("../../../db/books.json")

const listBooks = (req, res) => {
    return res.json({
        book: booksData,
    })
}

const postBooks = async (req, res) => {
    const bookID = booksData.length + 1;
    const newBooksData = [...booksData, {...req.body, bookID }];

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
