/**
 * Created by admin on 1/19/2017.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var studSchema   = new Schema({
    id: Number,
    name: String,
    email: String,
    date: Date,
    state: String,
    city: String,
    img: String,
    gender: String
});

module.exports = mongoose.model('Stud', studSchema);