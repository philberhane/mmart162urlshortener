const express = require('express')
const errorhandler = require('errorhandler')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
const mongodb = require('mongodb')
const mongoose = require('mongoose')
var mongoDB = 'insert_your_database_url_here';

//create database connection
const DATABASE_NAME = 'url_database'
const MONGODB_URI = 'mongodb://localhost:27017/' + DATABASE_NAME
mongoose.connect(MONGODB_URI)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error'))

let app = express()
app.use(express.static('../client'))
// Middleware: Does stuff to the request and response objects
// before routing:
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())
app.use(cors())



app.post('/response', routes.postForm)

app.get('/', function (req, res) {
    const path = require('path')
    res.sendFile(path.resolve('../client/index.html'))
})

app.get('/:code', function (req, res) {
  //  res.status(200).send(req.params)
    res.statusCode = 302
  res.setHeader("Location", "https://www.google.com/search?source=lnms&q="+ req.params.code)
  res.end()

})


/*
// NOTE: We will worry about comments next week:
app.get('/posts/:postId/comments', routes.comments.getComments)
app.post('/posts/:postId/comments', routes.comments.addComment)
app.put('/posts/:postId/comments/:commentId', routes.comments.updateComment)
app.delete('/posts/:postId/comments/:commentId', routes.comments.removeComment)
*/

app.listen(3000)
