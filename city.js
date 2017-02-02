/**
 * Created by lcom64_two on 2/1/2017.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var citySchema   = new Schema({
    cid: Number,
    cname: String,
    sid: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'State'
}
});
module.exports = mongoose.model('City', citySchema);