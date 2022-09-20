const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const cors = require("cors");
const book = require("./models/BookModel");
const user = require('./models/userModel');
const { updateOne } = require("./models/BookModel");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

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

// Authorization
function authenticateToken(req, resp, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return resp.status(401).json({
        error: "Unauthorized user"
    })

    jwt.verify(token, 'secret', (err, data) => {
        if (err) return resp.status(403).json({
            error: "access token is not valid"
        })
        req.id = data.id;
        next()
    })
}

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
            resp.status(200).send(data);
        })
        .catch((err) => {
            resp.status(404).json({
                error: "Failed to fetch data"
            });
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
            resp.status(200).send(specificCategory);
        })
        .catch(() => {
            resp.status(404).json({
                error: "Failed to fetch data"
            });
        });
});

// get books by title
app.get("/books/title/:title", (req, resp) => {
    let title = req.params.title;
    let limit = req.query.limit;
    let skip = (req.query.page - 1) * limit;
    title = title.replaceAll('+', " ");
    book
        .find({ title: { $regex: new RegExp(".*" + title + ".*", "i") } })
        .limit(limit)
        .skip(skip)
        .then((data) => {
            if (data.length == 0) throw err;
            resp.status(200).send(data);
        })
        .catch(() => {
            resp.status(404).json({
                error: "Failed to fetch data"
            });
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
            resp.status(200).send(data);
        })
        .catch(() => {
            resp.status(404).json({
                error: "Failed to fetch data"
            });
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
            resp.status(200).send(data);
        })
        .catch((err) => {
            resp.status(404).json({
                error: "Failed to fetch data"
            });
        });
});

// get books by isbn
app.get("/books/isbn/:isbn", (req, resp) => {
    book
        .find({ ISBN: req.params.isbn })
        .then((data) => {
            if (data.length == 0) throw err;
            resp.status(200).send(data);
        })
        .catch((err) => {
            resp.status(404).json({
                error: "Failed to fetch data"
            });
        });
});

// get book by id
app.get("/books/id/:id", (req, resp) => {
    let id = req.params.id;
    book
        .findById(id)
        .then((singleBook) => {
            if (singleBook.length == 0) throw err;
            resp.status(200).send(singleBook);
        })
        .catch(() => {
            resp.status(404).json({
                error: "Failed to fetch data"
            });
        });
});

// get user cart 
app.post('/user/cart', authenticateToken, async (req, resp) => {
    const idUser = req.id;
    const result = await user.findOne({ _id: idUser }, { cart: 1 });
    let cartFromResult = result.cart;
    if (cartFromResult.length == 0) {
        resp.status(200).json({
            message: "Cart is empty"
        })
    } else {
        let cartToReturn = [];
        for (let item of cartFromResult) {
            let bookData = await book.findOne({ _id: item.bookId }, { title: 1, price: 1, image: 1, discount:1 })
            cartToReturn.push({
                _id: item.bookId,
                title: bookData.title,
                image: bookData.image,
                price: item.price,
                discount: bookData.discount
            })
        }
        resp.status(200).send(cartToReturn)
    }
});

// get user owned books 
app.post('/user/books', authenticateToken, async (req, resp) => {
    const idUser = req.id;
    const result = await user.findOne({ _id: idUser }, { books: 1 });
    let booksFromResult = result.books;
    if (booksFromResult.length == 0) {
        resp.status(200).json({
            message: "No purchases yet"
        })
    } else {
        let booksToReturn = [];
        for (let item of booksFromResult) {
<<<<<<< HEAD
            let bookData = await book.findOne({ _id: item.bookId }, { title: 1, price: 1, image: 1 })
=======
            let bookData = await book.findOne({ _id: item.bookId }, { title: 1, price: 1, image: 1, discount: 1 })
>>>>>>> 6f98fd6f4f4161c2272842b963463c0f94464960
            booksToReturn.push({
                title: bookData.title,
                image: bookData.image,
                price: bookData.price,
<<<<<<< HEAD
=======
                discount: bookData.discount,
>>>>>>> 6f98fd6f4f4161c2272842b963463c0f94464960
                datePurchased: item.datePurchased
            })
        }
        resp.status(200).send(booksToReturn)
    }
    /* user.find({ _id: idUser }, { books: 1 })
        .then((result) => {
            const books = result[0].books;
            if (books.length === 0) {
                resp.status(200).json({
                    message: "You do not have any books yet"
                })
            } else {
                resp.status(200).send(books);
            }
        })
        .catch((err) => {
            resp.status(400).json({
                error: err
            });
        }) */
});

app.post('/user/credit', authenticateToken, async (req, resp) => {
    const idUser = req.id;
    const result = await user.findOne({ _id: idUser }, { credit: 1 });
    if(result){
        resp.status(200).json({credit:result.credit});
    }
});

// Add register user
app.post('/register', (req, resp, next) => {
    let email = req.body.email
    user.find({ email: email }).then((data) => {
        if (data.length != 0) throw err;
        bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
            if (err) {
                resp.status(500).json({
                    error: "Cannot encrypt password"
                });
            }
            let User = new user({
                email: req.body.email,
                password: hashedPass,
                name: req.body.name,
                gender: req.body.gender,
                "credit": 500,
                "cart": [],
                "books": []
            })
            User.save()
                .then(User => {
                    resp.json({
<<<<<<< HEAD
=======
                        name: User.name,
>>>>>>> 6f98fd6f4f4161c2272842b963463c0f94464960
                        message: "User saved successfully!"
                    })
                })
                .catch(err => {
                    resp.status(500).json({
                        error: "Cannot add new user"
                    })
                })
        })
    }).catch(() => {
        resp.status(409).json({
            error: "Email already exists"
        });
    })

})

app.post('/login', (req, resp, next) => {
    const userEmail = req.body.email;
    const password = req.body.password;

    user.findOne({ email: userEmail })
        .then((user) => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        resp.status(400).json({
                            error: err
                        })
                    } else if (result) {
                        let token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' })
                        resp.status(200).json({
                            name: user.name,                    
                            message: "logged in successfully",
                            token
                        })
                    } else {
                        resp.status(500).json({
                            message: "Cannot generate token"
                        })
                    }
                });
            } else {
                resp.status(401).json({
                    message: "User not found"
                })
            }
        })
})

//remove cart
app.put('/books/removeCart/:id', authenticateToken, (req, resp) => {
    let idUser = req.id;
    book
        .find({ _id: req.params.id })
        .then((singlebook) => {
            user.updateOne(
                { _id: idUser },
                { $pull: { "cart": { "bookId": req.params.id } } },
                { safe: true },
                function (error, success) {
                    if (error) {
                        throw err;
                    } else {
                        resp.status(200).json({
                            message: "Book removed from cart successfully"
                        });
                    }
                });
        })
        .catch((err) => {
            resp.status(404).json({
                error: "Failed to fetch data"
            });
        });
})
//Old rating function
// app.put('/rating', authenticateToken, (req, resp) => {
//     const bookId = req.body.book_id;
//     const rate = req.body.rate
//     book.findById(bookId).then((data) => {
//         let rateCount = data.rating.count;
//         let rateAvg = data.rating.average;
//         let newAvg = ((rateAvg * rateCount) + parseFloat(rate)) / (rateCount + 1)
//         newAvg = newAvg.toPrecision(3);
//         let newRate = {
//             average: newAvg,
//             count: rateCount + 1
//         }
//         book.findByIdAndUpdate(
//             { _id: bookId },
//             { rating: newRate },
//             function (error, success) {
//                 if (error) {
//                     throw err;
//                 } else {
//                     resp.status(200).json({
//                         message: "rating added successfully"
//                     });
//                 }
//             })
//     }).catch((err) => {
//         resp.status(404).json({
//             error: "Failed to fetch data"
//         });
//     });
// })

// new rating function 
app.put('/rating', authenticateToken, async (req, resp) => {
    const userId = req.id;
    const bookId = req.body.book_id;
    const rate = req.body.rate

    const userData = await user.findOne({_id: userId, "books.bookId":bookId},{books:1})
    let singleBook = []
    if(userData){
         singleBook = userData.books.filter(book => {
            return book.bookId == bookId
        })
    }
    
    if(userData && !singleBook[0].rated){
        await user.updateOne({
            _id: userId,
            books: { $elemMatch: { bookId: bookId} }
          },
          { $set: { "books.$.rated" : true } })
        const data = await book.findById(bookId);
        let rateCount = data.rating.count;
        let rateAvg = data.rating.average;
        let newAvg = ((rateAvg * rateCount) + parseFloat(rate)) / (rateCount + 1)
        newAvg = newAvg.toPrecision(3);
        let newRate = {
            average: newAvg,
            count: rateCount + 1
        }
        book.findByIdAndUpdate(
            { _id: bookId },
            { rating: newRate },
            function (error, success) {
                if (error) {
                    throw err;
                } else {
                    resp.status(200).json({
                        message: "rating added successfully"
                    });
                }
            })

    }else{
        resp.status(403).json({message:"you do not own the book"})
    }
    
})

//add to cart final
app.put('/books/addCart/:id', authenticateToken, async (req, resp) => {
    let idUser = req.id;
    const cartBook = await user.findOne({ _id: idUser, "cart.bookId": req.params.id });
    if (cartBook) {
        resp.status(400).json({
            message: "Already in cart"
        });
        return;
    }
    const bookData = await user.findOne({ _id: idUser, "books.bookId": req.params.id });
    if (bookData) {
        resp.status(400).json({
            message: "Already owned"
        });
        return;
    }
    const singlebook = await book.find({ _id: req.params.id });
    let newcart = {
        bookId: singlebook[0]._id,
        discount: singlebook[0].discount,
        price: singlebook[0].price,
        priceAfterDiscount: singlebook[0].price * ( 1 - singlebook[0].discount / 100)
    }
    user.findByIdAndUpdate(
        { _id: idUser },
        { $push: { cart: newcart } },
        function (error, success) {
            if (error) {
                throw err;
            } else {
                resp.status(200).json({
                    message: "Book added successfully"
                });
            }
        }
    );
})

// checkout
app.put('/placeorder', authenticateToken, async (req, resp) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formatedDate = hours + ':' + minutes + ':' + seconds + '  ' + month + '/' + day + '/' + year;
    let idUser = req.id;

    const result = await user.findOne({ _id: idUser }, { cart: 1, credit: 1 });
    const balance = result.credit
    const cart = result.cart; //to get carts only
    const addedbooks = []
    let totalPrice = 0;
    console.log(cart);
    for (let book of cart) {
        addedbooks.push({
            bookId: book.bookId,
            datePurchased: formatedDate
        })
        totalPrice += book.priceAfterDiscount
    }
    console.log(totalPrice)
    if (totalPrice > balance) {
        resp.status(400).json({
            error: "Insufficient balance"
        })
    } else {
        for (let b of addedbooks) {
            //to increment sellCount in book
            const s = await book.findByIdAndUpdate(
                { _id: b.bookId },
                { $inc: { 'sellCount': 1 } },
                { $new: true }).lean().exec(
                    function (error, success) {
                        if (error) {
                            throw error;
                        }
                    }
                );
        }

        // Clear cart
        const r = await user.updateOne({ _id: idUser }, { $set: { cart: [] } })

        // Update purchases
        const a = await user.updateOne({ _id: idUser }, { $push: { books: { $each: addedbooks } } })

        // Update user Balance
        const s = await user.updateOne({ _id: idUser }, { credit: balance - totalPrice })

        // Sending response
        resp.status(200).json({
            message: "Purchased successfully"
        })
    }
})
