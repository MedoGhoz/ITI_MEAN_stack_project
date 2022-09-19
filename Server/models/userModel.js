const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    "email": {type: String, unique: true, dropDups: true ,required: true},
    "password": {type: String, required: true},
    "name": {type: String, requiered: true},
    "gender": {type: String, required: false},
    "credit": {type: Number, required: false},
    "cart": [{
        "bookId": {type: String, required: false},
        "discount": {type: Number, required: false},
        "price": {type: Number, required: false},
        "priceAfterDiscount": {type: Number, required: false}
    }],
    "books":[{
        "bookId": {type: String, required: false},
        "rated": {type:Boolean, required: false, default:false},
        "datePurchased": {type: String, required: false}
    }]
})

module.exports = mongoose.model('user', userSchema);