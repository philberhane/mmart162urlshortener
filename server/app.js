const express = require('express')
const errorhandler = require('errorhandler')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
const mongodb = require('mongodb')
const mongoose = require('mongoose')
var mongoDB = 'insert_your_database_url_here';

//Create database connection
const DATABASE_NAME = 'url_database'
const MONGODB_URI = 'mongodb://localhost:27017/' + DATABASE_NAME
mongoose.connect(MONGODB_URI)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error'))

let app = express()
app.use(express.static('../client'))
// Middleware executes before routing
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())
app.use(cors())

app.post('/response', routes.postForm)
app.get('/', function (req, res) {
    const path = require('path')
    res.sendFile(path.resolve('../client/index.html'))
    })
app.get('/:code', routes.redirectUrl)

app.listen(3000)
