/**
 * Created by admin on 1/19/2017.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var studSchema   = new Schema({
    id: Number,
    name: String,
    marks: String
});

module.exports = mongoose.model('Stud', studSchema);