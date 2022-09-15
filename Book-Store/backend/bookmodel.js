const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    "ISBN": Number,
    "title": String,
    "summary": String,
    "author": String,
    "image": String,
    "category": String,
    "price": Number,
    "sellCount": Number,
    "discount": Number,
    "rating": {
        "average": Number,
        "count": Number
    }
})

module.exports = mongoose.model('book', bookSchema);