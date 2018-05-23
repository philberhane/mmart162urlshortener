const mongoose = require('mongoose')

const ShortenerSchema = new mongoose.Schema({
    date_expires: Date,
    longUrl: String,
    code: String,
})

module.exports = mongoose.model('Shortener', ShortenerSchema);
