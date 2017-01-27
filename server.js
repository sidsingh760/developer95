/**
 * Created by lcom64_two on 1/25/2017.
 */
var express  = require('express');
var app      = express();
var Stud = require('./model/stud');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/mydb');     // connect to mongoDB database on modulus.io
app.use(express.static(__dirname + '/public'));         // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.get('/studs', function(req, res) {

    Stud.find(function(err, studs) {
        if (err)
            res.send(err)
        res.json(studs); // return all todos in JSON format
    });
});
app.get('/studs/:to_id', function(req, res) {
    Stud.findById(req.params.to_id,function(err, studs) {
        if (err)
            res.send(err)
        res.json(studs); // return all todos in JSON format
    });

});

app.put('/studs/:to_id',function(req, res) {
    Stud.findById(req.params.to_id, function (err, studs) {
        if (err)
            res.send(err);
       // res.send(studs);

        //studs._id = req.body._id;
        studs.name = req.body.name;
        studs.marks = req.body.marks;
        studs.save();
        Stud.find(function (err, products) {
            if (err)
                res.send(err)
            res.json(products);
        });
    });
})
// app.get('/', function(req, res) {
//     res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
// });

app.delete('/studs/:id', function(req, res) {
    Stud.remove({
        _id : req.params.id
    }, function(err, todo) {
        if (err)
            res.send(err);
        // get and return all the todos after you create another
        Stud.find(function(err, stud) {
            if (err)
                res.send(err)
            res.json(stud);
        });
    });
});

app.post('/studs', function(req, res) {
    Stud.create({
        name : req.body.name,
        marks : req.body.marks,
        id : req.body._id

    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Stud.find(function(err, studs) {
            if (err)
                res.send(err)
            res.json(studs);
        });
    });
});
var server = app.listen(8090, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});