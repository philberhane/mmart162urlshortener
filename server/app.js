const express = require('express')
const errorhandler = require('errorhandler')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')



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
  var path = require('path')
    res.sendFile(path.resolve('../client/index.html'))
})


/*app.get('/redirect', function (req, res) {
  res.statusCode = 302
  res.setHeader("Location", "http://www.google.com/")
  res.end()
})*/

/*
// NOTE: We will worry about comments next week:
app.get('/posts/:postId/comments', routes.comments.getComments)
app.post('/posts/:postId/comments', routes.comments.addComment)
app.put('/posts/:postId/comments/:commentId', routes.comments.updateComment)
app.delete('/posts/:postId/comments/:commentId', routes.comments.removeComment)
*/

app.listen(3000)
