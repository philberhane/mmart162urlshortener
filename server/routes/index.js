const mongoose = require('mongoose')
const models = require('../models')

const database = []

module.exports = {

        postForm(req, res) {
        console.log(req.body)


            if (req.body.code.length === 0) {
                const alphabet = 'abcdefghijklmnopqrstuvwxyz'
                let randomGeneratedCode = ''

                    for (i = 0; i < 6; i++) {
                        randomGeneratedCode += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
                        }

                  req.body.code = randomGeneratedCode

            }

            else if (req.body.code.length > 0 && req.body.code.length < 6) {
                res.status(500).send({
                message: 'Your code is too short! Please enter a 6 letter code'
                })
            }

            res.status(200).send({
                message : `Here is your code: ${req.body.code}`,
            })

    }
      addPost(req, res) {
            data = req.body
            data.date_created = new Date()
            const blog = new Shortener(data)
            shortener.save(function (err, model) {
                if (err) {
                    return console.error(err)
                }

}
