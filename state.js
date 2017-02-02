/**
 * Created by lcom64_two on 2/1/2017.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var stateSchema   = new Schema({
    sid: Number,
   sname: String
});

module.exports = mongoose.model('State', stateSchema);