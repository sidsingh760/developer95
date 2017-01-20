/**
 * Created by lcom64_two on 1/19/2017.
 */
/**
 * Created by admin on 1/19/2017.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var depSchema   = new Schema({
    did: Number,
    dname: String
});

module.exports = mongoose.model('Dep', depSchema);