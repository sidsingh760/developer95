/**
 * Created by lcom64_two on 1/23/2017.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var imgSchema   = new Schema({

    pname: String,

    pimg: String
});

module.exports = mongoose.model('Product', imgSchema);