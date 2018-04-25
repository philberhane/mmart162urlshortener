module.exports = {
    
    postForm(req, res) {
        console.log(req.body)
    
        res.status(200).send({message : `Here is your long URL: ${req.body.longUrl}. Here is your code: ${req.body.code}`})
    }
    
}