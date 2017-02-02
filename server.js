/**
 * Created by lcom64_two on 1/25/2017.
 */
var express  = require('express');
var app      = express();
var Stud = require('./model/stud');
var State = require('./model/state');
var City = require('./model/city');
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
app.get('/state', function(req, res) {
    State.find(function(err, states) {
        if (err)
            res.send(err)
        res.json(states);
    });
});
app.get('/city/:id', function(req, res) {
    City.find({ sid: {$eq: req.params.id}}).exec(function(err, cities) {
        if (err)
            res.send(err)
        res.json(cities);
    });
});
app.put('/studs/:to_id',function(req, res) {
    Stud.findById(req.params.to_id, function (err, studs) {
        if (err)
            res.send(err);
        studs.name = req.body.name;
        studs.email = req.body.email;
        studs.state = req.body.state;
        studs.city = req.body.city;
        studs.gender = req.body.gender;
        studs.date = req.body.date;
        studs.save();
        Stud.find(function (err, products) {
            if (err)
                res.send(err)
            res.json(products);
        });
    });
})
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
        email : req.body.email,
        state : req.body.state,
        city : req.body.city,
        gender : req.body.gender,
        date : req.body.date,
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
var server = app.listen(89, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});