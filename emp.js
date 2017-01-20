/**
 * Created by lcom64_two on 1/19/2017.
 */
/**
 * Created by admin on 1/19/2017.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var empSchema   = new Schema({
    eid: Number,
    ename: String,
    did: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dep'
    },
});

module.exports = mongoose.model('Emp', empSchema);