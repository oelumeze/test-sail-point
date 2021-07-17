const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 4000;
const util = require('./util');


app.use(bodyParser.json()) //this will allow express to recognise properties in request body from http

const books = [];

app.post("/book/createBook", (req, res) => {
    let { title, author } = req.body;
    if (!title || !author) { 
        return res.status(400).json({
            message: "Title and Author name must be provided"
        });
    }
    books.push({
        bookId: util.generateId(),
        title,
        author
    });
    return res.status(201).json(req.body);
})

app.get('/book/list', (req, res) => {
    const bookIds = books.map((item) => { 
        return { 
            bookId: item.bookId 
        } 
    });
    return res.status(200).json(bookIds);
})

app.get('/book/:bookId/title', (req, res) => {
    
    const strtoIntId = Number(req.params.bookId);
    const idExist = util.idExist(books, strtoIntId);
    if (idExist) {
        const title =  books.find(item => item.bookId === strtoIntId).title;
        if (title) {
            return res.status(200).json({
                title: title
            });
        }
    } else {
        return res.status(400).json({
            message: "Book not found"
        })
    }
})

app.get('/book/:bookId/author', (req, res) => {
    
    const strToIntId = Number(req.params.bookId);
    const idExist = util.idExist(books, strToIntId);
    if (idExist) {
        const author = books.find(item => item.bookId === strToIntId).author;
        if (author) {
            return res.status(200).json({
                author: author
            });
        }
    } else {
        return res.status(400).json({
            message: "Book not found"
        })
    }
})

app.listen(port, () => {
    console.log(`App is started and listening on ${port}`);
})