const express = require("express");
const app = express();
const mongoose = require("mongoose");

const book = require("./models/BookModel");

mongoose
    .connect(
        "mongodb+srv://MuhammadAhmad_:v0qe18fEhI3Ilre9@e-commercedb.qlmze8a.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Database Connection failed!");
    });

app.listen(4000, function () {
    console.log("server is listening on port 4000...");
});

// get all books
app.get("/books", (req, resp) => {
    let limit = req.query.limit;
    let skip = (req.query.page - 1) * limit;
    book
        .find()
        .limit(limit)
        .skip(skip)
        .then((data) => {
            if (data.length == 0) throw err;
            resp.send(data);
        })
        .catch((err) => {
            resp.status(404).send("Failed to fetch data");
        });
});

// get book by category
app.get("/books/category/:category", (req, resp) => {
    let category = req.params.category;
    let limit = req.query.limit;
    let skip = (req.query.page - 1) * limit;
    book
        .find({ category: { $regex: new RegExp(category, "i") } })
        .limit(limit)
        .skip(skip)
        .then((specificCategory) => {
            if (specificCategory.length == 0) throw err;
            resp.send(specificCategory);
        })
        .catch(() => {
            resp.status(404).send("Failed to fetch data");
        });
});

// get books by title
app.get("/books/title/:title", (req, resp) => {
    let title = req.params.title;
    let limit = req.query.limit;
    let skip = (req.query.page - 1) * limit;
    title = title.replace(/-/g, " ");
    book
        .find({ title: { $regex: new RegExp(".*" + title + ".*", "i") } })
        .limit(limit)
        .skip(skip)
        .then((data) => {
            if (data.length == 0) throw err;
            resp.send(data);
        })
        .catch(() => {
            resp.status(404).send("Failed to fetch data");
        });
});

// get best-sellers
app.get("/books/best-sellers", (req, resp) => {
    let limit = req.query.limit;
    let skip = (req.query.page - 1) * limit;
    book
        .find()
        .sort({ sellCount: -1 })
        .limit(limit)
        .skip(skip)
        .then((data) => {
            if (data.length == 0) throw err;
            resp.send(data);
        })
        .catch(() => {
            resp.status(404).send("Failed to fetch data");
        });
});

// get books by discount
app.get("/books/discount", (req, resp) => {
    let limit = req.query.limit;
    let skip = (req.query.page - 1) * limit;
    book
        .find({ discount: { $ne: 0 } })
        .limit(limit)
        .skip(skip)
        .then((data) => {
            if (data.length == 0) throw err;
            resp.send(data);
        })
        .catch((err) => {
            resp.status(404).send("Failed to fetch data");
        });
});

// get books by isbn
app.get("/books/isbn/:isbn", (req, resp) => {
    book
        .find({ ISBN: req.params.isbn })
        .then((data) => {
            if (data.length == 0) throw err;
            resp.send(data);
        })
        .catch((err) => {
            resp.status(404).send("Failed to fetch data");
        });
});

// get book by id
app.get("/books/id/:id", (req, resp) => {
    let id = req.params.id;
    book
        .findById(id)
        .then((singleBook) => {
            if (singleBook.length == 0) throw err;
            resp.send(singleBook);
        })
        .catch(() => {
            resp.status(404).send("Failed to fetch data");
        });
});
