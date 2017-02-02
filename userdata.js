/**
 * Created by lcom64_two on 2/1/2017.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userdataSchema   = new Schema({
    id: Number,
    name: String,
    sid: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'State'
    },
    cid: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'City'
    },
    img: String,
    gender: String,
    email: String,
    dob: String,
    is_active: Boolean
});

module.exports = mongoose.model('Userdata', userdataSchema);