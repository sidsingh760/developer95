/**
 * Created by lcom64_two on 2/6/2017.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var custSchema   = new Schema({

   cname: String

});

module.exports = mongoose.model('Cust', custSchema);