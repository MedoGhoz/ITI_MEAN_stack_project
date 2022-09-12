const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    "email": String,
    "password": String,
    "name": String,
    "gender": String,
    "credit": {"type": Number, "required": false},
    "cart": [{
        "bookId": {"type": String, "required": false},
        "price": {"type": Number, "required": false}
    }],
    "books":[{
        "bookId": {"type": String, "required": false},
        "datePurchased": {"type": String, "required": false}
    }],
})

module.exports = mongoose.model('user', userSchema);