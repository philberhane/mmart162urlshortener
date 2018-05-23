require('dotenv').config()
const express = require('express')
const errorhandler = require('errorhandler')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
const mongodb = require('mongodb')
const mongoose = require('mongoose')

//create database connection
const MONGODB_URI = `${process.env.MONGODB_URI}`
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
app.use(express.static(path.join(__dirname, '../client/')))

app.post('/response', routes.postForm)

app.get('/', function (req, res) {
    const path = require('path')
    res.sendFile(path.join(__dirname, '../client/index.html'))
})


app.get('/:code', routes.redirectUrl)


/*
// NOTE: We will worry about comments next week:
app.get('/posts/:postId/comments', routes.comments.getComments)
app.post('/posts/:postId/comments', routes.comments.addComment)
app.put('/posts/:postId/comments/:commentId', routes.comments.updateComment)
app.delete('/posts/:postId/comments/:commentId', routes.comments.removeComment)
*/

app.listen(process.env.PORT || 3000)
