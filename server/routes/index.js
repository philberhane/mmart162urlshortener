const database = []

module.exports = {
        postForm(req, res) {
        console.log(req.body)
        database.push(req.body)

        res.status(200).send({
          message : `Here is your code: ${req.body.code}`,
          //Define ask sarah
          database: database
        })
        console.log(database)
    }

}
