const mongoose = require('mongoose')

//Define a schema
const ShortenerSchema = new mongoose.Schema({
    date_created: Date,
    longUrl: String,
    code: String,

})

module.exports = mongoose.model('Shortener', ShortenerSchema);
