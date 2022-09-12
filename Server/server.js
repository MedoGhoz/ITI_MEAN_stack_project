const express = require('express')
const app = express()
const mongoose = require('mongoose')

const book = require('./models/BookModel')

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

app.get('/books/discount', (req, resp) => {
    book.find({discount:{$gt:0}}).then((data) => {
        resp.send(data)
    }).catch(err => {
        console.log('Failed to fetch data')
    })
})
app.get('/books/isbn/:isbn', (req, resp) => {
    book.find({ISBN:req.params.isbn}).then((data) => {
        resp.send(data)
    }).catch(err => {
        console.log('Failed to fetch data')
    })
})


