/**
 * Created by lcom64_two on 2/6/2017.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var newcustSchema   = new Schema({

    name: String,
    cname: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Cust'
    }

});

module.exports = mongoose.model('NewCust', newcustSchema);

