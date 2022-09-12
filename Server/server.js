var express = require('express')
var app = express()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

var book = require('./models/BookModel')
const { response } = require('express')

mongoose.connect('mongodb+srv://MuhammadAhmad_:v0qe18fEhI3Ilre9@e-commercedb.qlmze8a.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Database Connection failed!')
  })

app.listen(8081, function () {
  console.log('server is listening on port 8081...')
})

app.get('/books', (req, resp) => {
    book.find().then((data) => {
        resp.send(data)
    }).catch(err => {
        console.log('Failed to fetch data')
    })
})
app.get('/books/:category',(requst,response)=>{
  let category=requst.params.category;
  book.find({"category":category}).then((specificCategory)=>{
    response.send(specificCategory);
  }).catch(()=>{
    console.log('Category is not found');
  })
})

