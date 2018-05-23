const mongoose = require('mongoose')
const models = require('../models')

const Shortener = mongoose.model('Shortener', models.Shortener)

module.exports = {



    postForm(req, res) {
       // console.log(req.body)

        if (req.body.longUrl.indexOf('http://') === 0 || req.body.longUrl.indexOf('https://') === 0 ) {
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
                message: 'Error: Your code is too short! Please enter a 6 letter code'
                })
                return
            }

    } else {
            res.status(500).send({
                message: 'Error: Please include an "http://" or "https://" in your URL'
                })
                return
        }






        data = req.body

        const someDate = new Date();
        const numberOfDaysToAdd = 2;
        const expiration = someDate.setDate(someDate.getDate() + numberOfDaysToAdd)

        data.date_expires = expiration

        const shortener = new Shortener(data)

        const today = new Date()


    Shortener.findOne({ 'code': shortener.code },  (err, codeExists) => {

        if(codeExists) {

            if (today >= shortener.date_expires) {

                //console.log(shortener.date_expires)
               shortener.set({ longUrl : req.body.longUrl})
                shortener.set({date_expires : expiration})
                shortener.save( (err, updatedObj) => {
                    if (err) return handleError(err);

                    res.status(201).send({postId: updatedObj._id, message : `Here is your shortened URL: localhost:3000/${req.body.code}`})
                console.log(updatedObj, 'saved!!!')

                        })
            } else {


                res.status(500).send({
                message: 'Error: This code already exists! Please try another.'
                })}

        } else {

            shortener.save( (err, model) => {

            res.status(201).send({postId: model._id, message : `Here is your shortened URL: localhost:3000/${req.body.code}`})
                console.log(model, 'saved!!!')

        })

        }


    })






    },


    redirectUrl(req, res) {
      Shortener.findOne({ 'code': req.params.code },  (err, urlObject) => {
            if (err) {
                return handleError(err);
            }
            console.log(urlObject.longUrl)
            res.redirect(urlObject.longUrl)
            res.end()
        })


}




}
