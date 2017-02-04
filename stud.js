/**
 * Created by admin on 1/19/2017.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var studSchema   = new Schema({
    // id: Number,
    // name: String,
    // email: String,
    // date: Date,
    // sname: String,
    // cname: String,
    // img: String,
    // gender: String

    name: String,
    email: String,
    dob: Date,
    state: String,
    city: String,
    gender: String,
    active : Boolean,
    pimg: String
});

module.exports = mongoose.model('Stud', studSchema);