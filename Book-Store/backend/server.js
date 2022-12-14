const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const book = require("./bookmodel");
//const user = require('./models/userModel');
const cors = require("cors");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
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
            error : "access token is not valid"
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
            resp.send(data);
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
            resp.send(specificCategory);
        })
        .catch(() => {
            resp.status(404).json({
                error:"Failed to fetch data"
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
            resp.send(data);
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
            resp.send(data);
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
            resp.send(data);
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
            resp.send(data);
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
            resp.send(singleBook);
        })
        .catch(() => {
            resp.status(404).json({
                error: "Failed to fetch data"
            });
        });
});

// Add register user
app.post('/register', (req, resp, next) => {
    let email = req.body.email
    user.find({ email: email }).then((data) => {
        if (data.length != 0) throw err;   
        bcrypt.hash(req.body.password, 10, function(err, hashedPass){
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
            "credit": 100,
            "cart": [],
            "books":[]
             })
            User.save()
            .then(User => {
                resp.json({
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

app.post('/login', (req, resp, next) =>{
    const userEmail = req.body.email;
    const password = req.body.password;

    user.findOne({email: userEmail})
    .then((user) => {
        if(user){
            bcrypt.compare(password, user.password, (err, result) => {
                if(err){
                    resp.json({
                        error: err
                    })
                }else if(result){
                    let token = jwt.sign({id: user._id},'secret',{expiresIn:'1h'})
                    resp.json({
                        name: user.name,
                        message: "logged in successfully",
                        token
                    })
                }else{
                    resp.json({
                        message: "Cannot generate token"
                    })
                }
            });
        }else{
            resp.json({
                message: "User not found"
            })
        }
    })
})

app.post('/test', authenticateToken, (req, resp) => {
    console.log(req.id);
    user.findById(req.id).then((data) => {
        resp.send(data)
    }).catch(() => {
        resp.send("No data")
    })
})