const mongoose = require('mongoose')
const models = require('../models')

const Shortener = mongoose.model('Shortener', models.Shortener)

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
        
    
            
        data = req.body
        data.date_created = new Date()
        const shortener = new Shortener(data)
        shortener.save( (err, model) => {
            if (err) {
                return console.error(err)
            }
            console.log(model, 'saved!!!')

            res.status(201).send({postId: model._id, message : `Here is your Shortened URL: localhost:3000/${req.body.code}`})
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
