/**
 * Created by lcom64_two on 2/6/2017.
 */

var express  = require('express');
var app      = express();
var Cust = require('./model/cust');
var NewCust = require('./model/newcust');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var cors=require('cors');
// var multer  = require('multer')
mongoose.connect('mongodb://localhost:27017/mydb');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
 app.use(cors());
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
// var storage = multer.diskStorage({
//     destination: function (request, file, callback) {
//         callback(null, './uploads');
//     },
//     filename: function (request, file, callback) {
//         console.log("file:"+file.originalname);
//         var filename=file.originalname;
//         request.body.pimg =filename;
//         callback(null, file.originalname);
//     }
// });
// var upload = multer({storage: storage}).any('pimg');


app.get('/cust', function(req, res) {
    Cust.find(function(err, custs) {
        if (err)
            res.send(err)
        res.json(custs);
    });
});
app.get('/newcust', function(req, res) {
    NewCust.find(function(err, newcust) {
        if (err)
            res.send(err)
        res.json(newcust);
    });
});
app.post('/newcust', function(req, res) {

    NewCust.create({
        name : req.body.name,
        cname : req.body.cname
    }, function(err, todo) {
        if (err)
            res.send(err);
        NewCust.find(function(err, data) {
            if (err)
                res.send(err)
            res.json(data);
        });
    });
});
// app.delete('/cust/:id', function(req, res) {
//     Cust.remove({
//         _id : req.params.id
//     }, function(err, todo) {
//         if (err)
//             res.send(err);
//
//         Cust.find(function(err, cust) {
//             if (err)
//                 res.send(err)
//             res.json(cust);
//         });
//     });
// });

var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});