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
var multer = require('multer');
mongoose.connect('mongodb://localhost:27017/mydb');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json({limit : '5mb'}));
app.use(bodyParser.json({type: 'application/vnd.api+json' }));
 app.use(cors());
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './pages/uploads');
    },
    filename: function (request, file, callback) {
        console.log("file:"+file.originalname);
        var filename=file.originalname;
        request.body.pimg =filename;
        callback(null, file.originalname);
    }
});
var upload = multer({storage: storage}).any('pimg');
app.get('/newcust/:to_id', function(req, res) {
    NewCust.findById(req.params.to_id,function(err, cust) {
        if (err)
            res.send(err)
        res.json(cust); // return all todos in JSON format
    });
});

app.get('/newcust', function(req, res) {
    NewCust.find(function(err, newcust) {
        if (err)
            res.send(err)
        res.json(newcust);
    });
});
app.post('/newcust',upload, function(req, res) {
    NewCust.create({
        name : req.body.name,
        cname : req.body.cname,
        pimg : req.body.pimg
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
app.delete('/newcust/:id', function(req, res) {
    NewCust.remove({
        _id : req.params.id
    }, function(err, todo) {
        if (err)
            res.send(err);

        NewCust.find(function(err, cust) {
            if (err)
                res.send(err)
            res.json(cust);
        });
    });
});
app.put('/newcust/:id',function(req, res) {
    NewCust.findById(req.params.id, function (err, studs) {
        if (err)
            res.send(err);
        studs.name = req.body.name;
        studs.cname = req.body.cname;

        studs.save();
        NewCust.find(function (err, products) {
            if (err)
                res.send(err)
            res.json(products);
        });
    });
})
var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});