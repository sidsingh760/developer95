/**
 * Created by lcom64_two on 2/1/2017.
 */

var express  = require('express');
var app = express();
var User = require('../model/userdata');
var State = require('../model/state');
var City = require('../model/city');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
mongoose.connect('mongodb://localhost:27017/mydb');     // connect to mongoDB database on modulus.io
app.use(express.static(__dirname + '/public'));         // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.get('/state', function(req, res) {
    State.find(function(err, states) {
        if (err)
            res.send(err)
        res.json(states);
    });
});
app.post('/state', function(req, res) {
    State.create({
        sname : req.body.sname,
        sid : req.body._id

    }, function(err, todo) {
        if (err)
            res.send(err);
        State.find(function(err, states) {
            if (err)
                res.send(err)
            res.json(states);
        });
    });
});
app.get('/city/:cid', function(req, res) {
    User.findById(req.params.cid,function(err, cities) {
        if (err)
            res.send(err)
        res.json(cities); // return all todos in JSON format
    });
});
app.get('/city', function(req, res) {
    City.find(function(err, cities) {
        if (err)
            res.send(err)
        res.json(cities);
    });
});
app.post('/city', function(req, res) {
    City.create({
        cname : req.body.cname,
        cid : req.body._id,
        sid : req.body.sid
    }, function(err, todo) {
        if (err)
            res.send(err);
        City.find(function(err, cities) {
            if (err)
                res.send(err)
            res.json(cities);
        });
    });
});
app.get('/userdata', function(req, res) {
    User.find(function(err, users) {
        if (err)
            res.send(err)
        res.json(users);
    });
});
app.post('/userdata', function(req, res) {
    User.create({
        name : req.body.name,
        cid : req.body.cid,
        sid : req.body.sid,
        img : req.body.img,
        gender : req.body.gender,
        email : req.body.email,
        dob : req.body.dob,
        is_active : req.body.is_active
    }, function(err, todo) {
        if (err)
            res.send(err);
        User.find(function(err, users) {
            if (err)
                res.send(err)
            res.json(users);
        });
    });
});
app.get('/userdata/:to_id', function(req, res) {
    User.findById(req.params.to_id,function(err, users) {
        if (err)
            res.send(err)
        res.json(users); // return all todos in JSON format
    });
});

app.put('/userdata/:to_id',function(req, res) {
    User.findById(req.params.to_id, function (err, users) {
        if (err)
            res.send(err);

        users.name = req.body.name;
        users.sid = req.body.sid;
        users.cid = req.body.cid;
        users.img = req.body.img;
        users.gender = req.body.gender;
        users.email = req.body.email;
        users.dob = req.body.dob;
        users.is_active = req.body.is_active;
        users.save();
        users.find(function (err, users1) {
            if (err)
                res.send(err)
            res.json(users1);
        });
    });
})

app.delete('/userdata/:id', function(req, res) {
    User.remove({
        _id : req.params.id
    }, function(err, todo) {
        if (err)
            res.send(err);
        // get and return all the todos after you create another
        User.find(function(err, user) {
            if (err)
                res.send(err)
            res.json(user);
        });
    });
});

var server = app.listen(8090, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});